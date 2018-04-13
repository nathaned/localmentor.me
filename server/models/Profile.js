const mongoose = require('mongoose');
const Tag = require('./Tag');

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
	tags: {
		type: [String],
		default: []
	},
	mentors: {
		type: [String],
		default: []
	},
	mentees: {
		type: [String],
		default: []
	},
	requestedMentors: {
		type: [String],
		default: []
	},
	requestedMentees: {
		type: [String],
		default: []
	},
	unreads: {
		type: [String],
		default: []
	},
	numRatings: {
		type: Number,
		default: 0
	},
	sumRatings: {
		type: Number,
		default: 0
	},
	rating500: {
		type: Number,
		default: 0
	}
});

class ProfileClass {
	static async createEmptyProfile(username) {
		this.create({ username });
	}

	static async findByUsername (username) {
		const user = await this.findOne({ username });
		console.log("user in find function: ", user);
		return user;
	}

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

	static async getContactList(username) {
		const connections = await this.findOne(
			{ username }, { mentors: 1, mentees: 1 }
		);
		let contactList = [];
		for (mentor of connections.mentors) {
			contactList.push( {
				email: mentor.email,
				firstName: mentor.firstName,
				lastName: mentor.lastName,
				relation: "mentor",
				username: mentor.username,
			});
		}
		for (mentee of connections.mentees) {
			contactList.push( {
				email: mentee.email,
				firstName: mentee.firstName,
				lastName: mentee.lastName,
				relation: "mentee",
				username: mentee.username,
			});
		}
		return contactList;
	}

	static async getUnreads(username) {
		const user = await this.findOne({ username }, { unreads: 1 });
		if (!user) {
			console.log("user not found in getUnreads: ", username);
			return [];
		}
		console.log("got unreads", user.unreads);
		return user.unreads;
	}

	static async appendUnread(recipient, sender) {
		const user = await this.findByUsername(recipient);
		if (!user) {
			console.log("user not found in appendUnread: ", recipient);
			return;
		}
		const user2 = await this.findByUsername(sender);
		if (!user2) {
			console.log("user not found in appendUnread: ", sender);
			return;
		}
		let unreads = user.unreads;
		if (unreads.indexOf(sender) == -1) {
			unreads.push(sender);
		}
		await this.findOneAndUpdate( {username: recipient }, { unreads });
	}

	static async getUserTags(username) {
		const user = await this.findOne({ username }, { tags: 1 });
		if (!user) {
			console.log("user not found in getUserTags: ", sender);
			return;
		}
		return user.tags || [];
	}

	static async updateProfile(username, profile) {
		const {
			firstName,
			lastName,
			email,
			location,
			isMentee,
			isMentor,
			bio,
			tags
		} = profile;
		if (tags) {
			const oldTags = await this.getUserTags(username);
			Tag.updateUserTags(username, oldTags, tags);
		}
		await this.findOneAndUpdate(
			{username},
			{
				firstName,
				lastName,
				email,
				location,
				isMentee,
				isMentor,
				bio,
				tags
			}
		);
	}

	static async requestMentor(requester, requested) {
		const mentee = await this.findByUsername(requester);
		if (!mentee) {
			console.log("requestMentor: requester (mentee) not found");
			return;
		}
		const mentor = await this.findByUsername(requested);
		if (!mentor) {
			console.log("requestMentor: requested (mentor) not found");
			return;
		}

		let requestedMentors = mentee.requestedMentors;
		if (requestedMentors.indexOf(requested) == -1) {
			requestedMentors.push(requested);
		}
		await this.findOneAndUpdate({ username: requester }, { requestedMentors });

		let requestedMentees = mentor.requestedMentees;
		if (requestedMentees.indexof(requester) == -1) {
			requestedMentees.push(requestMentor);
		}
		await this.findOneAndUpdate({ username: requester }, { requestedMentees });
	}


	// called when Mentor accepts a request! uses user in session  (mentor)
	// takes care of moving menotrs/mentees from the requested section to actual mentors/mentees
	static async acceptRequest(mentor, mentee) {
		const addmentee = await this.findOne({username: mentor}, {$pull: {requestedMentees: mentee}}, {$addToSet: {mentees: mentee}});
		if (!user) {return res.status(403).json("not logged in");}

		const addmentee = await this.findOne({username: mentee}, {$pull: {requestedMentors: mentor}}, {$addToSet: {mentors: mentor}});
		if (!user) {return res.status(403).json("mentee not found");}  			// dont see why this is relavent tho, lol
	}

	// must be signed in to work, uses user in session
	static async checkMentors(user) {
		const mentorList = await this.findOne({username: user}, {mentors: 1});
		if(!mentorList){return false;}

		// gonna try to figure out a way iterate thru the array and have
		// the profile of each as an object in a json array

		return mentorList;
	}

	static async checkMentees(user) {
		const menteeList = await this.findOne({username: user}, {mentors: 1});
		if(!menteeList){return false;}

		// gonna try to figure out a way iterate thru the array and have
		// the profile of each as an object in a json array
		return menteeList;

	static async getProfiles(usernames) {
		const profiles = await this.find(
			{ username: { $in: usernames } }
		).sort({ rating500: 'descending' });
		return profiles || [];
	}

	static async rateUser(username, rating) {
		const profile = await this.findByUsername(username);
		if (!profile) {
			console.log("user " + username + " not found in rateUser");
			return false;
		}
		const newRating = Math.floor(
			(profile.sumRatings + rating) / (profile.numRatings + 1) * 100
		);
		await this.findOneAndUpdate(
			{ username },
			{
				sumRatings: (profile.sumRatings + rating),
				numRatings: (profile.numRatings + 1),
				rating500: newRating
			}
		);

	}
}



mongoSchema.loadClass(ProfileClass);

const Profile = mongoose.model('Profile', mongoSchema);

module.exports = Profile;
