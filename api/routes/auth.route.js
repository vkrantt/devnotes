const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword,
  getUserById,
  updateUserById,
  deleteUserById,
  getStatistic,
  findUserByEmail,
} = require("../controllers/auth.controller");
const authToken = require("../middlewares/verifyToken");
const router = express.Router();

router.route("/").get(authToken, findUserByEmail);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/changepassword/:id").post(changePassword);
router.route("/getUserById/:id").get(authToken, getUserById);
router.route("/updateUser/:id").post(authToken, updateUserById);
router.route("/deleteUser/:id").post(authToken, deleteUserById);
router.route("/statistics").get(getStatistic);

module.exports = router;
