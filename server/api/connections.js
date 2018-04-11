const express = require('express');
const connectionsApi = express.Router();
const Profile = require('../models/Profile');
const { getUserFromSession } = require('./auth')

// slug = mentee the request is coming from
connectionsApi.post('/api/connections/acceptRequest/:mentee', async (req, res) => {
  const user = getUserFromSession(req);
  if (!user) {return res.status(403).json("not logged in");}

  const accepted = acceptRequest(user, req.params.slug);
  if(!accepted) {return res.status(404).json("failed accept request")}

  return res.status(200).json(`You have ${req.params.slug} as a new mentee!`);
});


// get users' current mentors
connectionsApi.get('/api/connections/mentors', async (req, res) => {
  const user = "test";//getUserFromSession(req);
  if (!user) {return res.status(403).json("not logged in");}

  const mentorList = Profile.checkMentors(user);
  if(!mentorList) {return res.status(404).json("emptyList, or error in find")}

  return res.status(200).json(mentorList);
});

// get users' current mentees
connectionsApi.get('/api/connections/mentees', async (req, res) => {
  const user = "test";//getUserFromSession(req);
  if (!user) {return res.status(403).json("not logged in");}

  const menteeList = Profile.checkMentees(user);
  if(!mentorList) {return res.status(404).json("emptyList, or error in find")}

  return res.status(200).json(menteeList);
});











module.exports = { connectionsApi };
