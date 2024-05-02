//packeges
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const RouterUsers = require("./src/routes/route.user");
const RouterPosts = require("./src/routes/route.posts");
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("data is connected.");
    app.listen(process.env.PORT || 4000, function() {
      console.log("Express app running on port " + (process.env.PORT || 3000));
    });
  })
  .catch(err => {
    console.log("data is not connected.");
  });
//app==>use
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", RouterUsers);
app.use("/api/posts", RouterPosts);
app.use((error, req, res, next) => {
  return res.json({ msg: error.message });
});
app.get("/", (req, res) => {
  res.send("88");
});
