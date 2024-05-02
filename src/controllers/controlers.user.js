const WrapHandle = require("../middlewares/handdle.error");
const User = require("../models/User.model");
const CreateToken = require("../utils/Jwt.token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("../routes/route.user");
const rigister = WrapHandle(async (req, res, next) => {
  const { userName, password, email, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User({
    userName,
    password: hashedPassword,
    email,
    role
  });
  const token = await CreateToken({
    email,
    userName,
    role: newUser.role,
    _id: newUser._id
  });
  newUser.token = token;
  const verifyEmail = await User.findOne({ email: email });
  if (verifyEmail) {
    return res.status(400).json({ msg: "the email has been registered." });
  }
  await newUser.save();
  return res.status(201).json({ data: { newUser } });
});

const Login = WrapHandle(async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "the email is not found." });
  }
  const passwordTest = await bcrypt.compare(password, user.password);
  if (!passwordTest) {
    throw Error("the password is wrong .");
  }
  return res.status(201).json({ data: { user } });
});

const GetAllUsers = WrapHandle(async (req, res, next) => {
  const users = await User.find({}, { __v: false });
  return res.status(200).json({ data: { users } });
});
const DeleteUser = WrapHandle(async (req, res, next) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (!user.deletedCount) {
    return res
      .status(400)
      .json({ data: { msg: "the user is not found in dataBase." } });
  }
  return res.status(200).json({ data: { msg: user } });
});
const DeleteAll = WrapHandle(async (req, res, next) => {
  const users = await User.deleteMany({ role: "User" });
  const users2 = await User.deleteMany({ role: "Admin" });
  if (!users.deletedCount || !users2.deletedCount) {
    return res
      .status(400)
      .json({ data: { msg: "the users is not found in dataBase." } });
  }
  users.deletedCount+=users2.deletedCount;
  return res.status(200).json({ data: { msg: users } });
});

const PatchUser = WrapHandle(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  return res.status(200).json({ data: { user } });
});
module.exports = {
  rigister,
  Login,
  GetAllUsers,
  DeleteUser,
  PatchUser,
  DeleteAll
};
