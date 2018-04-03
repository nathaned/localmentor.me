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
	},
	messages: {
		type: []
	},
	unread: {
		type: Boolean,
		default: false
	}
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

	static async getUserContactList(username) {
		const user = await this.findOne({ username });
		console.log("user in getUserContactList function: ", user);
		let fullList = []
		const contactList = await user.contactList.map( async (contact) => {
			const curr = await Profile.getContactInfo(contact);
			fullList.push(curr);
		});
		return fullList;
	}

}

mongoSchema.loadClass(UserMessageClass);

const UserMessage = mongoose.model('UserMessage', mongoSchema);

module.exports = UserMessage;
