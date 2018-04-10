const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
	tag: {
		type: String,
		unique: true
	},
	tagMentors: {
		type: [String]
	}
})

class TagsClass {
	static async addMentorToTag(newTag, mentor) {
		console.log(`------>addMentorToTag function`);

		const isTag = await this.findOne({tag: newTag});
		if(!isTag){
			const newRecord = await this.create({tag: newTag, tagMentors: mentor} );
			console.log(`------> new "${newTag}" tag has been created`);
			return newRecord;
		}
		else{
			const addmentor = await this.findOneAndUpdate(
				{tag: newTag},
				{$addToSet:{tagMentors: mentor}},
				{new: true}
			);
			console.log(`------->${mentor} is added to the "${newTag}" tag`);
			return addmentor;
		}
	};

	static async exploreAllTags() {
		const alltags = await this.find({}, {tag: 1});
		return alltags;
	};

	// note: the only reason findOne is just is to be able to return false
	static async findMentors(lookupTag) {
		const mentors = await this.findOne({tag: lookupTag}, {tagMentors: 1});
		if(!mentors){return false;}
		return mentors;
	};

	// removes mentor and also deletes tag if empty
	static async removeMentorFromTag(mentor, dtag){
		const updatedTag = await this.findOneAndUpdate(
			{ tag: dtag },
			{ $pull: { tagMentors: mentor } },
			{ new: true }
		);

		const isEmpty = await this.find( { tagMentors: { $size: 0 }});
		if(isEmpty){
			await this.remove({tag: dtag});
			return false;
		}
		return updatedTag;
	}
}


TagsSchema.loadClass(TagsClass);

const Tag = mongoose.model('Tag', TagsSchema);

module.exports = Tag;