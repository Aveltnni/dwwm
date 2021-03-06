const mongoose = require("mongoose");

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },

  monthBirth: {
    type: String,
    required: true,
  },

  yearBirth: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));
