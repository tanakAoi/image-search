const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  auth0Id: { type: String, required: true },
  userName: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
