const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Not Enrolled", "Enrolled", "Completed", "In Progress"],
    default: "Not Enrolled",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
