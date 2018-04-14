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

// this call is used to grab parts of a profile from any user
usersApi.get('/api/profiles/:slug', async (req, res) => {
	const user = req.params.slug;
	const limitedProfile = await Profile.getLimitedProfile(user);
	if (!limitedProfile) {
		return res.sendStatus(404);
	}
	return res.status(200).json({ limitedProfile });
})

module.exports = { usersApi, getUserProfile };
