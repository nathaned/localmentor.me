const express = require('express');
const tagsApi = express.Router();
const Tags = require('../models/Tag');
const { getUserFromSession } = require('./auth')

// use to add a tag. tag == slug (taken care if it's a new tag)
tagsApi.post('/api/tags/:slug', async (req, res) => {
	const mentor = getUserFromSession(req);
	if (!mentor) {return res.status(403).json("not logged in");}

	const addTag = Tags.addMentorToTag(req.params.slug, mentor);
	if(!addTag) {return res.status(404).json("error happenned in addMentorToTag");}

	return res.status(200).json("succesful tag add");
});

// returns all tags in the database
tagsApi.get('/api/tags', async (req, res) => {
	const all = await Tags.exploreAllTags();
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

// returns all mentors related to the `slug` tag
tagsApi.get('/api/tags/:slug', async (req, res) => {
	const foundMentors = await Tags.findMentors(req.params.slug);
	if(!foundMentors) {return res.status(403).json("invalid tag");}
	return res.status(200).json(foundMentors);
});


// deletes mentor from tag, and if tag becomes empty, removes it completely from db
tagsApi.delete('/api/tags/:slug', async (req, res) => {
	const mentor = getUserFromSession(req);
	if (!mentor) {return res.status(403).json("not logged in");}

	const fixTag = await Tags.removeMentorFromTag(mentor, req.params.slug );
	if(!fixTag){return res.status(403).json("tag deleted or tag didn't exist anyways");}
	return res.status(200).json("removed");
});




module.exports = { tagsApi };
