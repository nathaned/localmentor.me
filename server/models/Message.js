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
		// user1 is the person who asked to see the messages, so any messages
		// where they are the recipient can be marked as read
		const read = await this.update(
			{ recipient: user1 },
			{ unread: false },
			{ multi: true }
		);
		// the messages in the coversation include
		const result = await this.find().or([
			{ sender: user1, recipient: user2 },
			{ sender: user2, recipient: user1 }
		]).sort({ date: 'ascending' });
		return result;
	}

}

mongoSchema.loadClass(MessageClass);

const Message = mongoose.model('Message', mongoSchema);

module.exports = Message;
