const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BASE_URL } = require("../config/config");
const Note = require("../models/notes.model");

async function registerUser(req, res) {
  const { firstName, lastName, email, password, image } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        response: "User already exists.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hash,
      userImage: image,
    });

    const savedUser = await newUser.save();
    const payload = {
      id: savedUser._id,
      username: `${savedUser.firstName} ${savedUser.lastName}`,
      email: savedUser.email,
      userImage: savedUser.userImage,
      isAdmin: savedUser.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    if (savedUser) {
      return res.header("auth-token", token).status(200).json({
        status: 200,
        response: "Account created successfully.",
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: error,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const query = {
      email: email,
      isDeleted: false,
    };
    const user = await User.findOne(query);
    if (!user) {
      return res.json({
        status: 400,
        response: "User Not found.",
      });
    }
    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser) {
      return res.json({
        status: 400,
        response: "User Not found.",
      });
    }

    const payload = {
      id: user._id,
      username: `${user.firstName} ${user.lastName}`,
      email: user.email,
      userImage: user.userImage,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.header("auth-token", token).status(200).json({
      status: 200,
      response: "Logged in successfully.",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      response: error,
    });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: 400,
      response: "User Not found.",
    });
  }

  const url = `${BASE_URL}/change-password?id=${user._id}`;
  return res.status(200).json({
    status: 200,
    response: "Email sent, You can reset your password now.",
    url,
    firstName: user.firstName,
    reply_to: user.email,
  });
}

async function changePassword(req, res) {
  const { id } = req.params;
  const { newPassword } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({
      status: 400,
      response: "User Not found.",
    });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(id, { $set: { password: hash } });

  res.status(200).json({
    status: "ok",
    response: "Password updated successfully.",
  });
}

// Get user by id
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        status: 400,
        response: "User Not found.",
      });
    }

    res.status(200).json({
      status: "ok",
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

// Update user
async function updateUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        status: 400,
        response: "User Not found.",
      });
    }

    await User.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({
      status: "ok",
      response: "Profile updated.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

// Delete user
async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        status: 400,
        response: "User Not found.",
      });
    }

    await User.findByIdAndUpdate(id, { $set: { isDeleted: true } });
    res.status(200).json({
      status: "ok",
      response: "Account deleted ! Hoping that we'll see you again.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

async function getStatistic(req, res) {
  try {
    const users = await User.find({}).count();
    const notes = await Note.find({ socialShare: true }).count();
    res.status(200).json({
      status: "ok",
      response: {
        users,
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword,
  getUserById,
  updateUserById,
  deleteUserById,
  getStatistic,
};
