const express = require('express');
const connectionsApi = express.Router();
const Profile = require('../models/Profile');
const { getUserFromSession } = require('./auth')

connectionsApi.get('/api/connections/request/:mentor', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const requested = Profile.requestMentor(user, req.params.mentor);
	if (!requested) {
		const error = "failed to request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


// slug = mentee the request is coming from
connectionsApi.get('/api/connections/acceptRequest/:mentee', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const accepted = Profile.acceptRequest(user, req.params.mentee);
	if (!accepted) {
		const error = "failed accept request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


connectionsApi.get('/api/connections/ignoreRequest/:mentee', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const ignored = Profile.ignoreRequest(user, req.params.mentee);
	if (!ignored) {
		const error = "failed ignore request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


connectionsApi.get('/api/connections/block/:mentee', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const blocked = Profile.block(user, req.params.mentee);
	if (!blocked) {
		const error = "failed accept request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


// get users' current mentors
connectionsApi.get('/api/connections/mentors', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const mentorList = Profile.checkMentors(user);
	if(!mentorList) {
		const error = "error in find mentor";
		return res.status(404).json({ error });
	}

	const profiles = await Profile.getProfiles(mentorList);
	return res.status(200).json({profiles});
});

// get users' current mentees
connectionsApi.get('/api/connections/mentees', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const menteeList = Profile.checkMentees(user);
	if (!mentorList) {
		const error = "error in find mentee";
		return res.status(404).json({ error });
	}
	//const profiles = await Profile.getProfiles(menteeList);

	return res.status(200).json({ menteeList });
});

module.exports = { connectionsApi };
