const express = require('express');
const messagesApi = express.Router();
const { getUserFromSession } = require('./auth');
const Profile = require('../models/Profile');
const Message = require('../models/Message');

messagesApi.get('/api/messages/contactList', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		const error = "not logged in";
		return res.status(403).json({ error });
	}
	const contactList = await Profile.getContactList(user);
	return res.status(200).json({ contactList });
})

// based on the currently logged in user, returns a list of contacts whose messages are unread
messagesApi.get('/api/messages/unreads', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		const error = "not logged in";
		return res.status(403).json({ error });
	}
	const unreads = await Profile.getUnreads(user);
	if (!unreads) {
		const error = unreads.error || "Error getting unreads";
		return res.status(404).json({ error });
	}
	return res.status(200).json({ unreads });
})

messagesApi.get('/api/messages/with-user/:slug', async (req, res) => {
	const user = getUserFromSession(req);
	if (!user) {
		const error = "not logged in";
		return res.status(403).json({ error });
	}
	const messages = await Message.getConversation(user, req.params.slug);
	await Profile.removeFromUnreads(user, req.params.slug);
	return res.status(200).json({ messages });
})

messagesApi.post('/api/messages/send', async (req, res) => {
	const { recipient, text } = req.body || {};
	const user = getUserFromSession(req);
	if (!user) {
		const error = "not logged in";
		return res.status(403).json({ error });
	}
	console.log("user: ", user);
	const result = await Message.sendMessage(user, recipient, text);
	if (!result) {
		const error = result.error || "Error sending message";
		return res.status(404).json({ error });
	}
	return res.status(200);

})

module.exports = { messagesApi };
