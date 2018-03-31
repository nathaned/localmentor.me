const express = require('express');
const usersApi = express.Router();
const { checkAuth } = require('./auth')

const getUserProfile = async (username) => {
	return false;
}

usersApi.get('/api/users/:slug', async (req, res) => {
	// search the database for the user
	const result = await getUserProfile(req.params.slug);

	// user not found, send 404
	if (!result) {
		console.log("a")
		return res.sendStatus(404);
	}

	// if user's permissions allow it, send the deets
	if (!result.hidden && !result.private)
		return res.sendStatus(200).json({ user: result });

	// otherwise, load the current logged-in user
	const user = checkAuth(user);

	// if the requested user is "hidden", only show the profile if it is the user himself
	if (result.hidden && user == result.username)
		return res.sendStatus(200).json({ user: result });

	// if the requested user is "private", only show the profile to logged-in users
	if (result.private && user)
		return res.sendStatus(200).json({ user: result });

	// otherwise, send a 403 (no permission)
	return res.sendStatus(403);
});

module.exports = { usersApi, getUserProfile };
