const express = require('express');
const authApi = express.Router();
const User = require('../models/User');

const checkAuth = (req) => {
	if (req.session && req.session.user)
		return req.session.user;
	return false;
}

const createUser = async (username, password, password2) => {
	if (await getUser(username)) {
		console.log("user already exists");
		return false;
	}
	if (password !== password2) {
		console.log("passwords don't match");
		return false;
	}
	const passwordHash = "thisisahash" // todo make this actually call bcrypt
	const user = await User.createUser(username, password, passwordHash);

	return user;
}

const getUser = async (username) => {
	const user = await User.find(username);
	console.log("user in getUser: ", user);
	return user;
}

authApi.post('/api/login', async (req, res) => {
	const { username, password } = req.body || {};
	const passwordHash = "PASSWORDHASH"; // todo make this actually use bcrypt

	const user = await User.authenticate(username, password, passwordHash);
	if (!user) {
		req.session.user = null;
		return res.sendStatus(403);
	}
	else {
		req.session.user = username;
		console.log("correct login!");
		return res.sendStatus(200);
	}
});

authApi.post('/api/register', async (req, res) => {
	const { username, password, password2 } = req.body || {}

	if (!username || !password || !password2) {
		console.log("fields not complete")
		return res.sendStatus(404);
	}

	const user = await createUser(username, password, password2);
	console.log(user);
	if (!user) {
		req.session.user = null;
		return res.sendStatus(403);
	}
	else {
		req.session.user = username;
		console.log("successfully created user");
		return res.sendStatus(200);
	}
});

// TODO figure out if both post and get logout requests are necessary
authApi.post('/api/logout', (req, res) => {
	req.session.user = null;
	return res.sendStatus(204)
})
authApi.get('/logout', (req, res) => {
	req.session.user = null;
	return res.redirect('/');
})

authApi.get('/api/checkAuth', async (req, res) => {
	const user = checkAuth(req);
	if (user)
		return res.status(200).json({ user });
	else
		return res.sendStatus(403);
})


module.exports = { authApi, checkAuth, getUser };
