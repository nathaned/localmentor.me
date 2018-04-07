import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TagsSchema = new Schema({
  tag: {type: String, unique: true},
  tagMentors: {type: [String]}          // email/username
})



class TagsClass {
  static publicFields() {
    return [
      'tag',
      'tagMentors'
    ];
  }


static async addMentorToTag( newTag, mentor){
  console.log(`${mentor} has added themselves to the "${tag}" tag`);
  this.findOne({tag: newtag},
  (err, newTag) =>
  {
    if(err){
      this.create({newTag});
      console.log(` new "${tag}"  has been created`);
    }
      this.findOneAndUpdate(
        {newTag},
        {$addToSet:{mentor}},
        {new: true},
        (err, tag) =>
        {
          if(err){ res.send(err);}
          res.send(tag);
      });
      console.log(`>${mentor} is added to the "${tag}" tag`);
  })
}




}
