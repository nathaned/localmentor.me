const express = require('express');
const tagsApi = express.Router();
const Tag = require('../models/Tag');
const Profile = require('../models/Profile');

tagsApi.post('/api/tags/search', async (req, res) => {
	const tags = req.body.tags;
	const usernames = await Tag.searchTags(tags);
	const profiles = await Profile.getProfiles(usernames);
	return res.status(200).json({profiles});
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
