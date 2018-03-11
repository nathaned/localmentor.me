const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: String,
  passwordHash: String
})

mongoose.model('users', userSchema)
