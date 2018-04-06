import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TagsSchema = new Schema({
  tag: {type: String, unique: true},
  tagMentors: {type: [String]}          // email/username
})
