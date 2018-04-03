const express = require('express');
const messagesApi = express.Router();
const { getUserFromSession } = require('./auth');
const Profile = require('../models/Profile');
const UserMessage = require('../models/UserMessage');

messagesApi.get('/api/messages/contactList', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		const error = "not logged in";
		return res.status(403).json({ error });
	}
	const contactList = ["contact1", "contact2", "contact3"];
	return res.status(200).json({ contactList });
	/*
	const contactList = await UserMessage.getContactList(user);
	return res.status(200).json({ contactList });
	*/
})

module.exports = { messagesApi };
