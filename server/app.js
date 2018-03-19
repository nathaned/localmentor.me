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
const build = process.env.npm_lifecycle_event == 'build';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secretthinghere'

// TODO session stuff isn't optimized for production
const PORT = build ? 3000 : process.env.PORT;

const AUTHENTICATED_TYPE = 'authenticated'
const COOKIE_OPTIONS = {
	// domain: 'YOU_DOMAIN',
	path: '/',
	secure: !dev,
	httpOnly: true,
	signed: true
}

const authenticate = async (username, password) => {
	const url = process.env.USERS_URL_PREFIX + username + process.env.USERS_URL_SUFFIX;
	const request = await fetch(url);
	const users = await request.json();
	console.log(users);
	const user = users[0];
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
		console.log(req.cookies);
		const { username, password } = req.body || {}
		const user = await authenticate(username, password);
		if (!user) {
			req.session.user = null;
			return res.sendStatus(403);
		}
		else {
			req.session.user = username;
			console.log("correct!");
			return res.sendStatus(200);
		}

		/*
		const info = {
			email: user.email,
			name: user.name,
			type: AUTHENTICATED_TYPE
		}
		res.cookie('token', info, COOKIE_OPTIONS)
		return res.status(200).json(info)
		*/
	})

	server.post('/api/logout', (req, res) => {
		res.clearCookie('token', COOKIE_OPTIONS)
		return res.sendStatus(204)
	})

	server.get('/api/checkAuth', async (req, res) => {
		console.log(req.cookies);
		if (req.session && req.session.user)
			return res.status(200).json({ user: req.session.user });
		else
			return res.sendStatus(403);
	})

	server.post('/api/mentor-list', async (req, res) => {
		const response = await fetch(process.env.MENTOR_LIST);
		const list = await response.json();
		return res.status(200).json({list})
	})

	server.get('/api/profile', async (req, res) => {
		req.session.user = "hi";
		console.log(req.session.user);
		return res.status(200).json({ user: req.session.user })
		const { signedCookies = {} } = req
		const { token = '' } = signedCookies
		if (token && token.email) {
			const users = await axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data)
			const user = users.find(u => u.email.toLowerCase() === token.email.toLowerCase())
			return res.status(200).json({ user })
		}
		return res.sendStatus(404)
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

