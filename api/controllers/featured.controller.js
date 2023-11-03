const Featured = require("../models/featured.model");

// Add new user to featured
async function addUser(req, res) {
  const { firstName, lastName, email, userImage, expertise } = req.body;
  try {
    const user = await Featured.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        response: "User already added.",
      });
    }
    const newUser = await new Featured({
      firstName,
      lastName,
      email,
      userImage,
      expertise,
    });

    const savedUser = await newUser.save();
    const payload = {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      userImage: savedUser.userImage,
      expertise: savedUser.expertise,
    };

    if (savedUser) {
      return res.status(200).json({
        status: 200,
        response: payload,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: error,
    });
  }
}

// delete user form featured
async function deleteUser(req, res) {
  await Featured.findByIdAndRemove({ _id: req.query.id });
  res.send("User delete");
  try {
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: error,
    });
  }
}

// Get all user form featured
async function getAllFeaturedUser(req, res) {
  try {
    const users = await Featured.find({});
    return res.status(200).json({
      status: 200,
      response: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: error,
    });
  }
}

module.exports = {
  getAllFeaturedUser,
  addUser,
  deleteUser,
};
