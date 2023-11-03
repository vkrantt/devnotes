const express = require("express");
const {
  getAllFeaturedUser,
  addUser,
  deleteUser,
} = require("../controllers/featured.controller");
const authToken = require("../middlewares/verifyToken");
const router = express.Router();

router.route("/").get(getAllFeaturedUser);
router.route("/adduser").post(authToken, addUser);
router.route("/deleteUser").delete(authToken, deleteUser);

module.exports = router;
