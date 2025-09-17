const { response } = require("express");
const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  // isme hamare paad access rahega req.foodpartner ka.
  //   console.log(req.body); // is se undefined aayega console mein jiski wajah se log : undefined hoga.
  // iska solution hai multer

  //   console.log(req.file);
  // iska use karte hai to log the file which is being passed from the frontend

  try {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "food created successfuly",
      food: foodItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating food item",
      error: error.message,
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});
    // Fixed: response -> res
    res.status(200).json({
      message: "Food Item Fetched Successfully",
      foodItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching food items",
      error: error.message,
    });
  }
}

// Fixed: Added getFoodItems to module.exports
module.exports = {
  createFood,
  getFoodItems,
};
