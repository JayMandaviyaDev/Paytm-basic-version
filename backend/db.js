const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};