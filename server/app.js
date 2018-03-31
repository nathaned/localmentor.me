const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const next = require('next');
const { parse } = require('url');
const fetch = require('isomorphic-fetch');
const api = require('./api');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

dotenv.config();

const URI = process.env.MONGO_URI;
mongoose.connect(URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const dev = process.env.NODE_ENV !== 'production';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secretthinghere'

const PORT = process.env.PORT || 3000;

const createUser = async (username, password, passwordAgain) => {
	if (password !== passwordAgain)
		return null;
	const url = process.env.USERS_URL_PREFIX + username + process.env.USERS_URL_SUFFIX;
	const request = await fetch(url);
	const users = await request.json();
	const user = users[0];
	if (user) {
		console.log("user already exists");
		return null;
	}

	// post to database to create user
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
	server.use(passport.initialize());
	server.use(passport.session());

	//use sessions for tracking logins
	server.use(session({
		secret: COOKIE_SECRET,
		resave: true,
		// store: TODO should be a mongodb (or redis store?) if on production
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

	api(server);

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

