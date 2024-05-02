const mongoose = require("mongoose");
const PosetSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please,Send the title."],
    min: [2, "the words of body less than 3 word."],
    max: [30, "the words of body more than 30 word."]
  },
  body: {
    type: String,
    required: [true, "Please,Send the body."],
    min: [4, "the words of body less than 4 word."],
    max: [120, "the words of body more than 120 word."]
  },
  id_aurthor: {
    type: String
  },
  date_import: {
    type: String,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  }
});
const Post = mongoose.model("Post", PosetSchema);
module.exports = Post;
