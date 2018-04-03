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
	const contactList = [
		{
			username: "contact1",
			firstName: "firstName1",
			lastName: "lastName1",
			email: "contact1@example.com",
			relation: "mentor"
		},
		{
			username: "contact2",
			firstName: "firstName2",
			lastName: "lastName2",
			email: "contact2@example.com",
			relation: "mentor"
		},
		{
			username: "contact3verylong",
			firstName: "firstName3verylong",
			lastName: "lastName3verylong",
			email: "contact3verylong@example.com",
			relation: "mentee"
		}
	];
	return res.status(200).json({ contactList });
	/*
	const contactList = await UserMessage.getContactList(user);
	return res.status(200).json({ contactList });
	*/
})

module.exports = { messagesApi };
