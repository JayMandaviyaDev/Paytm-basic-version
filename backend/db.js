const mongoose = require("mongoose");

mongoose.connect(
  "mongodb_connetion_string"
);

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

const accountSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
