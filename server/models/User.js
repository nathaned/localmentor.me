const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Profile = require('./Profile');
const Message = require('./Message');

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
			'username'
		];
	}

	static async authenticate (username, password, passwordHash) {
		const user = await this.findByUsername(username);
		if (!user) {
			console.log("user not found");
			return false;
		}
		console.log("found user: ", user);
		console.log("actual password", user.password);
		console.log("entered password", password);

		const isMatch = await bcrypt.compare(password, user.passwordHash).
			catch(error => false);
		console.log("isMatch", isMatch);

		if (!isMatch) {
			console.log("incorrect password");
			return false;
		}

		return user;
	}

	static async findByUsername (username) {
		const user = await this.findOne({ username });
		console.log("user in find function: ", user);
		return user;
	}

	static async createUser (username, password) {
		// if the user is already in the database, then don't allow it to be added
		if ( await this.findByUsername(username) ) {
			const error = "Username Taken";
			console.log(error);
			return { error };
		}

		const passwordHash = "PASSWORDHASH"; // todo make this with bcrypt
		const user = await this.create({
			username,
			password,
			passwordHash
		});
		await Profile.createEmptyProfile(username);
		return user;
	}
}

mongoSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(3, function(err, salt) {
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.passwordHash = hash;
			next();
		});
	});
});

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
