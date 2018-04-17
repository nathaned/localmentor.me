const express = require('express');
const tagsApi = express.Router();
const Tag = require('../models/Tag');
const Profile = require('../models/Profile');
const { getUserFromSession } = require('./auth')

tagsApi.post('/api/tags/search', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		return res.sendStatus(403);
	}
	const rateLimited = await Profile.isRateLimited(user);
	if (rateLimited) {
		return res.status(200).json({ mentors: {error: "rate limited"} });
	}

	const tags = req.body.tags;
	const location = req.body.location;
	const usernames = await Tag.searchTags(tags);
	console.log("found these usernames matching those tags: ", usernames);
	const locatedProfiles = await Profile.limitLocation(usernames, location);
	console.log("limited by location: ", locatedProfiles);
	return res.status(200).json({ mentors: locatedProfiles});
});

// returns all tags in the database
tagsApi.get('/api/tags', async (req, res) => {
	const all = await Tag.exploreAllTags();
	if(!all) {
		return res.status(403).json({ error: "empty tags list" });
	}
	const formattedTags = all.map( ({tagMentors, tag}) =>
		({
			value: tag,
			label: tag + " (" + tagMentors.length + ")"
		})
	);
	return res.status(200).json(formattedTags);
});

module.exports = { tagsApi };
