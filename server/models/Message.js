const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Profile = require('./Profile');

const mongoSchema = new mongoose.Schema({
	recipient: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	unread: {
		type: Boolean,
		default: true
	},
	date: {
		type: Date,
		required: true
	}
});


class MessageClass {
	static publicFields() {
		return [
			'id',
			'username',
			'conatactList',
			'messages'
		];
	}

	static async sendMessage (sender, recipient, text) {
		console.log("going to send a message from " + sender + " to " + recipient + "  text is: " + text);
		const message = await this.create({
			recipient,
			sender,
			text,
			date: Date.now()
		});
		await Profile.appendUnread(recipient, sender);
		return true;
	}

	static async getConversation (user1, user2) {
		const result = await this.find().or([
			{ sender: user1, recipient: user2 },
			{ sender: user2, recipient: user1 }
		]);
		return result;
	}

}

mongoSchema.loadClass(MessageClass);

const Message = mongoose.model('Message', mongoSchema);

module.exports = Message;
