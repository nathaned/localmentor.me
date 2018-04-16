const express = require('express');
const authApi = express.Router();
const User = require('../models/User');

const getUserFromSession = (req) => {
	if (req.session && req.session.user)
		return req.session.user;
	return false;
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
	const { username, password, password2 } = req.body || {};

	if (!username || !password || !password2) {
		const error = "Fields not complete";
		console.log(error);
		return res.status(404).json({ error });
	}

	if (password !== password2) {
		const error = "Passwords do not match"
		console.log(error);
		return res.status(404).json({ error });
	}

	const user = await User.createUser(username, password);
	console.log(user);
	if (!user || user.error) {
		req.session.user = null;
		const error = (user && user.error) ? user.error : "Error";
		return res.status(403).json({ error });
	}
	else {
		req.session.user = username;
		console.log("successfully created user");
		return res.sendStatus(200);
	}
});

authApi.post('/api/logout', (req, res) => {
	req.session.user = null;
	return res.sendStatus(204)
})
authApi.get('/logout', (req, res) => {
	req.session.user = null;
	return res.redirect('/');
})

authApi.get('/api/checkAuth', async (req, res) => {
	const user = getUserFromSession(req);
	if (user)
		return res.status(200).json({ user });
	else
		return res.sendStatus(403);
})


module.exports = { authApi, getUserFromSession };
