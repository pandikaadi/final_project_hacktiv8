const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  phoneNumber:{
    type: String
  }
});

module.exports = mongoose.model('users', UsersSchema);