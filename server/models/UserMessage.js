const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mongoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	contactList: {
		type: [String]
	},/*
	messages: {
		type: [Message]
	}*/
});

class UserMessageClass {
	static publicFields() {
		return [
			'id',
			'username',
			'conatactList',
			'messages'
		];
	}

}

mongoSchema.loadClass(UserMessageClass);

const UserMessage = mongoose.model('UserMessage', mongoSchema);

module.exports = UserMessage;
