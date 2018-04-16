const mongoose = require('mongoose');
const md5 = require('md5');
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
	mentorBio: {
		type: String,
		default: ""
	},
	menteeBio: {
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
	toRate: {
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
	},
	blocked: {
		type: [String],
		default: []
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

	// return only the info necessary to draw the contact card in the messages view
	static async getContactInfo(username) {
		const contactInfo = await this.findOne(
			{username},
			{ firstName: 1, lastName: 1, isMentee: 1, isMentor: 1, email: 1 });
		return contactInfo;
	}

	static async getLimitedProfile(username) {
		const profile = await this.findOne(
			{ username },
			{ isMentor: 1, isMentee: 1, email: 1 }
		);
		if (!profile) {
			return false;
		}
		// calculate md5 for the email and hide the actual address
		profile.email = md5(profile.email);
		return profile;
	}

	static async getConnectionProfile(username) {
		const profile = await this.findByUsername(username);
		if (!profile) {
			return false;
		}
		let connectionProfile = JSON.parse(JSON.stringify(profile));
		console.log("got profile in gCP: ", profile);
		connectionProfile.mentees = await this.getProfiles(profile.mentees);
		connectionProfile.mentors = await this.getProfiles(profile.mentors);
		connectionProfile.requestedMentees = await this.getProfiles(profile.requestedMentees);
		connectionProfile.toRate = await this.getProfiles(profile.toRate);
		return connectionProfile;
	}

	// todo this needs to be updated to have more stuff done client-side
	static async getContactList(username) {
		const profile = await this.getConnectionProfile(username);
		let contactList = [];
		for (mentor of profile.mentors) {
			contactList.push( {
				email: mentor.email,
				firstName: mentor.firstName,
				lastName: mentor.lastName,
				relation: "mentor",
				username: mentor.username,
			});
		}
		for (mentee of profile.mentees) {
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
			mentorBio,
			menteeBio,
			tags
		} = profile;
		if (tags) {
			const oldTags = await this.getUserTags(username);
			await Tag.updateUserTags(username, oldTags, tags);
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
				mentorBio,
				menteeBio,
				tags
			}
		);
	}

	static async requestMentor(requester, requested) {
		const mentee = await this.findByUsername(requester);
		if (!mentee) {
			console.log("requestMentor: requester (mentee) not found: ", requester);
			return;
		}
		const mentor = await this.findByUsername(requested);
		if (!mentor) {
			console.log("requestMentor: requested (mentor) not found: ", requested);
			return;
		}

		await this.findOneAndUpdate(
			{ username: requester },
			{ $addToSet: { requestedMentors : requested } }
		);
		await this.findOneAndUpdate(
			{ username: requested },
			{ $addToSet: { requestedMentees: requester } }
		);
	}

	// called when Mentor accepts a request! uses user in session  (mentor)
	// takes care of moving menotrs/mentees from the requested section to actual mentors/mentees
	static async acceptRequest(mentor, mentee) {
		const addedMentee = await this.findOneAndUpdate(
			{ username: mentor },
			{
				$pull: { requestedMentees: mentee },
				$addToSet: { mentees: mentee }
			}
		);
		const addedMentor = await this.findOneAndUpdate(
			{ username: mentee },
			{
				$pull: { requestedMentors: mentor },
				$addToSet: { mentors: mentor }
			}

		);
		return (addedMentor && addedMentee); // todo
	}

	static async block(snowflake, baddie) {
		const safespace = await this.findOneAndUpdate(
			{ username: snowflake },
			{
				$pull: { requestedMentees: baddie },
				$pull: { requestedMentors: baddie },
				$pull: { mentees: baddie },
				$pull: { mentors: baddie },
				$addToSet: { blocked: baddie }
			}
		);
		return safespace;
	}

	static async ignoreRequest(mentor, mentee) {
		const ignoredMentee = await this.findOneAndUpdate(
			{username: mentor},
			{ $pull: { requestedMentees: mentee} }
		);
		console.log("ignoredMentee in ignoreRequest: ", ignoredMentee);
		return ignoredMentee;
	}

	static async endMentorship(user1, user2) {
		// we actually don't know who's who here
		let mentor = user1;
		let mentee = user2;
		const mentorProfile = await this.findByUsername(mentor);
		if (!mentorProfile) {
			console.log("mentor not found in endMentorship: ", mentor);
		}
		const menteeProfile = await this.findByUsername(mentee);
		if (!menteeProfile) {
			console.log("mentee not found in endMentorship: ", mentee);
		}

		if (mentorProfile.mentees.indexOf(mentee) == -1)
			[mentor, mentee] = [user2, user1]; // swap

		const part1 = await this.findOneAndUpdate(
			{ username: mentor },
			{
				$pull: { mentees: mentee },
				$addToSet: { toRate: mentee }
			}
		);
		const part2 = await this.findOneAndUpdate(
			{ username: mentee },
			{
				$pull: { mentors: mentor },
				$addToSet: { toRate: mentor }
			}
		);
		return (part1 && part2); // todo
	}

	static async getMentors(username) {
		const result = await this.findOne({ username }, {mentors: 1});
		if (!result) {
			return false;
		}
		return result.mentors;
	}

	static async getMentees(user) {
		const result = await this.findOne({username: user}, {mentees: 1});
		if (!result) {
			return false;
		}
		return result.mentees;
	}

	static async getProfiles(usernames) {
		const profiles = await this.find(
			{ username: { $in: usernames } }
		).sort({ rating500: 'descending' });
		return profiles || [];
	}

	static async limitLocation(usernames, currentLocation) {
		const profiles = await this.find({
			location: currentLocation,
			username: { $in: usernames }
		});
		return profiles || [];
	}

	static async rateUser(username, rater, rating) {
		const raterProfile = await this.findByUsername(rater);
		if (!raterProfile) {
			console.log("rater not found in rateUser: ", rater);
			return;
		}
		await this.findOneAndUpdate(
			{ username: rater },
			{ $pull: { toRate: username } }
		);
		console.log("rateUser", username, rater, rating);
		if (!rating) {
			return true;
		}
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
		return true; // todo
	}
}

mongoSchema.loadClass(ProfileClass);

const Profile = mongoose.model('Profile', mongoSchema);

module.exports = Profile;
