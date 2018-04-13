const express = require('express');
const usersApi = express.Router();
const { getUserFromSession } = require('./auth');
const Profile = require('../models/Profile');

const getUserProfile = async (username) => {
	return false;
}

// this call is used to get the currently-logged-in user's profile
usersApi.get('/api/profile', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const profile = await Profile.findByUsername(user);
	if (!profile) {
		return res.sendStatus(404);
	}
	return res.status(200).json({ profile });
})

// this call is used to update a profile
usersApi.post('/api/profile', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const profile = req.body.profile;
	if (!profile) {
		return res.sendStatus(404);
	}
	await Profile.updateProfile(user, profile);
	console.log("sending back a 200");
	return res.sendStatus(200);
})

// this would search the `profiles` database (that would be defined in `Profile.js` in the models folder)
// this function call would be used to load the user's profile page
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
		return res.status(200).json({ user: result });

	// otherwise, load the current logged-in user
	const user = checkAuth(user);

	// if the requested user is "hidden", only show the profile if it is the user himself
	if (result.hidden && user == result.username)
		return res.status(200).json({ user: result });

	// if the requested user is "private", only show the profile to logged-in users
	if (result.private && user)
		return res.status(200).json({ user: result });

	// otherwise, send a 403 (no permission)
	return res.sendStatus(403);
});

module.exports = { usersApi, getUserProfile };
