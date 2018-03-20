const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const next = require('next');
const { parse } = require('url');
const fetch = require('isomorphic-fetch');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secretthinghere'

const PORT = process.env.PORT || 3000;

// TODO put this in a different file
const authenticate = async (username, password) => {
	const url = process.env.USERS_URL_PREFIX + username + process.env.USERS_URL_SUFFIX;
	const request = await fetch(url);
	const users = await request.json();
	const user = users[0];

	// adds a delay (for animations and 'security')
	await new Promise((resolve) => {
		setTimeout(resolve, 500)
	})

	if (!user) {
		console.log("user not found");
		return null;
	}
	if (user.password !== password) {
		console.log("wrong password");
		return null;
	}
	return user;
}

const app = next({dir: '.', dev });
const handle = app.getRequestHandler();

// TODO makes routes
const getRoutes = require('./routes');

const routes = getRoutes();
app.prepare().then(() => {
	const server = express();

	server.use(express.json())
	server.use(cookieParser(COOKIE_SECRET))

	//use sessions for tracking logins
	server.use(session({
		secret: COOKIE_SECRET,
		resave: true,
		// store: TODO should be a mongodb if on production
		saveUninitialized: false
	}));

	// next.js stuff
	server.get('/_next/*', (req, res) => {
		handle(req, res);
	});
	server.get('/static/*', (req, res) => {
		handle(req, res);
	});

	server.use(bodyParser.json());

	// auth stuff
	server.post('/api/login', async (req, res) => {
		const { username, password } = req.body || {}
		const user = await authenticate(username, password);
		if (!user) {
			req.session.user = null;
			return res.sendStatus(403);
		}
		else {
			req.session.user = username;
			console.log("correct login!");
			return res.sendStatus(200);
		}
	})

	// TODO figure out if both post and get logout requests are necessary
	server.post('/api/logout', (req, res) => {
		req.session.user = null;
		return res.sendStatus(204)
	})
	server.get('/logout', (req, res) => {
		req.session.user = null;
		return app.render(req, res, '/');
	})

	server.get('/api/checkAuth', async (req, res) => {
		if (req.session && req.session.user)
			return res.status(200).json({ user: req.session.user });
		else
			return res.sendStatus(403);
	})

	// TODO make it actually search mentors, not always return the whole list
	server.post('/api/mentor-list', async (req, res) => {
		const { query, id } = req.body || {}
		const response = await fetch(process.env.MENTOR_LIST);
		const list = await response.json();
		return res.status(200).json({list})
	})

	server.get('/api/profile', async (req, res) => {
		req.session.user = "hi";
		console.log(req.session.user);
		return res.status(200).json({ user: req.session.user })
	})



	// api routes
	server.get('/*', (req, res) => {
		if (req.session && req.session.user)
			console.log("user is logged in");
		else
			console.log("user is NOT logged in");
		const parsedUrl = parse(req.url, true);
		const { pathname, query = {} } = parsedUrl;
		const route = routes[pathname];
		if (route) {
			return app.render(req, res, route.page, route.query);
		}
		return handle(req, res);
	});

	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${PORT}`);
	})
});

