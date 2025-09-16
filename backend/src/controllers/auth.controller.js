const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "88f623abf0f14fdd486e52136e813a2cac27acae"
  );
  // jo data hamne diya hai use unique format mein dena hai, doosri chhez hai jwt secret

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    "88f623abf0f14fdd486e52136e813a2cac27acae"
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User Logged in Successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

module.exports = { registerUser, loginUser };
