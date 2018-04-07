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




module.exports = { tagsApi };
