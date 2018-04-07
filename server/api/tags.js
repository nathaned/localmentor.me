const express = require('express');
const tagsApi = express.Router();
const Tags = require('../models/Tag');
const { getUserFromSession } = require('./auth')

// slug == new tag
tagsApi.post('/api/tags/:slug', async (req, res) => {
  const mentor = getUserFromSession(req);
  if (!mentor) {return res.status(403).json("not logged in");}

  const addTag = Tags.addMentorToTag(req.params.slug, mentor);
  if(!addTag) {return res.status(404).json("error happenned in addMentorToTag");}

  return res.status(200).json("succesful tag add");
});


// returns all tags in the database, you will need to extract "tag" only for
// drop down menu purposes 
tagsApi.get('/api/tags', async (req, res) => {
  const all = await Tags.exploreAllTags();
  if(!all) {return res.status(403).json("empty tags list");}
  return res.status(200).json(all);
});


module.exports = { tagsApi };
