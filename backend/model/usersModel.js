const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("medUsers", userSchema);

module.exports = userModel;
