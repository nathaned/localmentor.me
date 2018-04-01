const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	/* this stuff needs to be completed with whatever you decide you want to have here
	bio: {
		type: String,
		required: true
	},
	connections: {
		type: [UserClass],
		required: true
	}
	... lots of other things needed here (location, mentor/mentee, etc)
	*/
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
}

mongoSchema.loadClass(ProfileClass);

const Profile = mongoose.model('Profile', mongoSchema);

module.exports = Profile;
