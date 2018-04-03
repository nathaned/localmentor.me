const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		default: ""
	},
	location: {
		type: String,
		default: ""
	},
	isMentor: {
		type: Boolean,
		default: false
	},
	isMentee: {
		type: Boolean,
		default: true
	},
	bio: {
		type: String,
		default: ""
	},
	connections: {
		type: [String],
		default: []
	}
});

class ProfileClass {
	static publicFields() {
		return [
			'id',
			'username',
			/*
			 * add things here
			*/
		];
	}

	static async createEmptyProfile(username) {
		this.create({ username });
	}

	static async find (username) {
		const user = await this.findOne({ username });
		console.log("user in find function: ", user);
		return user;
	}

	/* need to setup how you want the user profile creation to work.
	* possibly this funciton would be called by the createUser() function of the User.js model
	static async createProfile (username, password, passwordHash) {
		// if the user is already in the database, then don't allow it to be added
		if ( await this.find(username) ) {
			console.log("username already in datbase");
			return false;
		}

		const user = await this.create({
			username,
			password,
			passwordHash
		});
		return user;
	}
	*/

	// returns everything except bio and connections list ( TODO add to this )
	static async getShortProfile(username) {
		const shortProfile = await this.findOne( {username}, { bio: 0, connections: 0 });
		console.log("shortProfile: ", shortProfile);
		return shortProfile;
	}

	// return only the info necessary to draw the contact card in the messages view
	static async getContactInfo(username) {
		const contactInfo = await this.findOne(
			{username},
			{ firstName: 1, lastName: 1, isMentee: 1, isMentor: 1, email: 1 });
		return contactInfo;
	}
}

mongoSchema.loadClass(ProfileClass);

const Profile = mongoose.model('Profile', mongoSchema);

module.exports = Profile;
