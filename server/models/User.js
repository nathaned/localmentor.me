const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true
	},
	password: { // todo remove this, just for testing
		type: String,
		required: true
	}
});

class UserClass {
	static publicFields() {
		return [
			'id',
			'username',
			'password',
			'passwordHash'
		];
	}

	static async authenticate (username, password, passwordHash) {
		const user = await this.find(username);
		if (!user) {
			console.log("user not found");
			return false;
		}
		console.log(user);
		console.log(user.password)
		console.log(password)

		if (user.password != password) { // todo change this to hash
			console.log("incorrect password");
			return false;
		}

		return user;
	}

	static async find (username) {
		const user = await this.findOne({ username });
		console.log("user in find function: ", user);
		return user;
	}

	static async createUser (username, password, passwordHash) {
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
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
