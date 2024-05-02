const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "The UserName Is Required. "]
  },
  password: {
    type: String,
    required: [true, "The Password Is Required. "]
  },
  email: {
    type: String,
    required: [true, "The Email Is Required. "],
    unique: [true, "this email has been registed."],
    validate: [validator.isEmail, "the email is wrong."]
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: ["User", "Admin", "Manger"],
    default: "User"
  }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
