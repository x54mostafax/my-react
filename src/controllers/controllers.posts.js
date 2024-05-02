const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Post = require("../models/post.model.js");
const WrapHandle = require("../middlewares/handdle.error");
const CreatePost = WrapHandle(async (req, res, next) => {
  const { title, body } = req.body;
  const newPost = await Post({ title, body });
  await newPost.save();
  return res.json({ msg: "Ok.", data: { newPost } });
});
const GetAllPost = WrapHandle(async (req, res, next) => {
  const Posts = await Post.find();
  return res.json({ msg: "Ok.", data: { Posts } });
});
module.exports = {
  CreatePost,
  GetAllPost
};
