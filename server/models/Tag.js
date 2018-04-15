const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
	tag: {
		type: String,
		unique: true
	},
	tagMentors: {
		type: [String]
	},
	count: {
		type:  Number,
		default: 1
	}
})

class TagClass {
	// todo use same format for addTag and removeTag (username, tag)
	static async addMentorToTag(newTag, mentor) {
		const isTag = await this.findOne({tag: newTag});
		if(!isTag){
			const newRecord = await this.create({ tag: newTag, tagMentors: mentor});
			console.log(`------> new "${newTag}" tag has been created`);
			return newRecord;
		}
		else{
			const addmentor = await this.findOneAndUpdate(
				{ tag: newTag },
				{ $addToSet: { tagMentors: mentor } },
				{ $inc:{count: 1} }
			);
			console.log(`------->${mentor} is added to the "${newTag}" tag`);
			return addmentor;
		}
	};

	static async exploreAllTags() {
		const alltags = await this.find({}).sort({count: -1});
		return alltags;
	};

	// note: the only reason findOne is just is to be able to return false
	static async findMentors(lookupTag) {
		const mentors = await this.findOne({tag: lookupTag}, {tagMentors: 1});
		if(!mentors) {
			return false;
		}
		return mentors;
	};

	static async searchTags(tags) {
		const result = await this.find(
			{ tag: { $in: tags } }
		);
		console.log(result);
		if (!result) {
			console.log("no users found for tags: ", tags);
			return [];
		}
		let usernames = {};
		// todo this is a mess, oops
		result.map( ({tagMentors}) => tagMentors.map( x => usernames[x] = true) );
		console.log(result);
		console.log("keys: ", Object.keys(usernames));
		return Object.keys(usernames);
	}

	// removes username and also deletes tag if empty
	static async removeMentorFromTag(username, dtag){
		const updatedTag = await this.findOneAndUpdate(
			{ tag: dtag },
			{ $pull: { tagMentors: username } }
		);
		// note: update returns the previous obj
		if (!updatedTag) {
			console.log("tag " + dtag + " not found");
			return false;
		}
		const isEmpty = updatedTag.tagMentors.length <= 1
		console.log(isEmpty);
		if(isEmpty) {
			console.log("removing empty tag: ", dtag);
			await this.remove({ tag: dtag });
			return false;
		}
		return updatedTag;
	}

	static async updateUserTags(username, oldTags, newTags) {
		await Promise.all(oldTags.map( async (tag) => await this.removeMentorFromTag(username, tag)));
		await Promise.all(newTags.map( async (tag) => await this.addMentorToTag(tag, username)));
	}
}

TagsSchema.loadClass(TagClass);

const Tag = mongoose.model('Tag', TagsSchema);

module.exports = Tag;
