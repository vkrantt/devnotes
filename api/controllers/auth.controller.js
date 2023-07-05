const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BASE_URL } = require("../config/config");

async function registerUser(req, res) {
  const { email, password } = req.body;
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
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    if (savedUser) {
      return res.status(200).json({
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
    const user = await User.findOne({ email });
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
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
  console.log("=========================", req.params);
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
    resposne: "Password updated successfully.",
  });
}

module.exports = { registerUser, loginUser, forgotPassword, changePassword };
