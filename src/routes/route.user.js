const express = require("express");
const model = require("../models/User.model");
const controllers = require("../controllers/controlers.user");
const verifyToken = require("../middlewares/verify.token");
const validToken = require("../middlewares/validToken");
const router = express.Router();
router
  .route("/")
  .get(verifyToken, validToken("Admin", "Manger"), controllers.GetAllUsers);

router
  .route("/deleteAll")
  .delete(verifyToken, validToken("Manger"), controllers.DeleteAll);

router
  .route("/:id")
  .delete(verifyToken, validToken("Admin", "Manger"), controllers.DeleteUser)
  .patch(verifyToken, validToken("Admin", "Manger"), controllers.PatchUser);
router.route("/register").post(controllers.rigister);

router.route("/login").post(controllers.Login);

module.exports = router;
