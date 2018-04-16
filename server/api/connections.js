const express = require('express');
const connectionsApi = express.Router();
const Profile = require('../models/Profile');
const { getUserFromSession } = require('./auth')

connectionsApi.get('/api/connections/request/:mentor', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const requested = await Profile.requestMentor(user, req.params.mentor);
	if (!requested) {
		const error = "failed to request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


connectionsApi.get('/api/connections/acceptRequest/:mentee', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const accepted = await Profile.acceptRequest(user, req.params.mentee);
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

	const ignored = await Profile.ignoreRequest(user, req.params.mentee);
	if (!ignored) {
		const error = "failed ignore request";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


connectionsApi.get('/api/connections/block/:user', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const blocked = await Profile.block(user, req.params.user);
	if (!blocked) {
		const error = "failed block";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});

connectionsApi.get('/api/connections/end/:user', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const ended = await Profile.endMentorship(user, req.params.user);
	if (!ended) {
		const error = "failed end";
		return res.status(404).json({ error });
	}

	return res.sendStatus(200);
});


// get users' current mentors
// todo not used
connectionsApi.get('/api/connections/mentors', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const mentorList = await Profile.getMentors(user);
	if(!mentorList) {
		const error = "error in find mentors";
		return res.status(404).json({ error });
	}

	const profiles = await Profile.getProfiles(mentorList);
	return res.status(200).json({profiles});
});


// get users' current mentees
// todo not used
connectionsApi.get('/api/connections/mentees', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}

	const menteeList = await Profile.getMentees(user);
	if (!mentorList) {
		const error = "error in find mentees";
		return res.status(404).json({ error });
	}
	//const profiles = await Profile.getProfiles(menteeList);

	return res.status(200).json({ menteeList });
});

module.exports = { connectionsApi };
