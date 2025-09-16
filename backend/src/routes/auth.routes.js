const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/user/register", authController.registerUser); // yaha pe ham (req, res) => {} ko use karne ki jagah controllers wale folder mein ek controller bana rahe hai
router.post("/user/login", authController.loginUser);

module.exports = router;
