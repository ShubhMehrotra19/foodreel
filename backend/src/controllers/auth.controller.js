const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.models");
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
    process.env.JWT_SECRET
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
    process.env.JWT_SECRET
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

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await foodPartnerModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Food partner already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id, // FIXED: was using 'user._id' instead of 'foodPartner._id'
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      // FIXED: changed from 'user' to 'foodPartner'
      id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name, // FIXED: was using 'fullname' which doesn't exist in foodPartner model
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body; // FIXED: removed 'await' - req.body is not a function
  const foodPartner = await foodPartnerModel.findOne({ email }); // FIXED: using foodPartnerModel instead of userModel

  if (!foodPartner) {
    return res.status(404).json({
      message: "Food partner not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password); // FIXED: using foodPartner instead of user
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id, // FIXED: using foodPartner._id instead of user._id
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      // FIXED: changed from 'user' to 'foodPartner'
      id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
