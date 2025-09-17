const express = require("express");
const router = express.Router();
const multer = require("multer");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
});

// express ka server kisi bhi tareeke ka file nahi padh sakta, isiliye we use multer to have express understand it

// POST : /api/food [protected]
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);
// ye API ek food item ko add karega in the db, and only food partner can access this route, to isko protected rakhna zaroori hai

// POST : /api/food [protected]
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router;
