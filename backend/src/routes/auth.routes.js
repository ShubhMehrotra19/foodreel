const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// user auth routes

router.post("/user/register", authController.registerUser); // yaha pe ham (req, res) => {} ko use karne ki jagah controllers wale folder mein ek controller bana rahe hai
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// food-partner auth routes
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPartner);

module.exports = router;
