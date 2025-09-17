const foodModel = require("../models/food.model");

async function createFood(req, res) {
  // isme hamare paad access rahega req.foodpartner ka.
  res.send("food item created");
  console.log(req.body); // is se undefined aayega console mein jiski wajah se log : undefined hoga.
  // iska solution hai multer

  console.log(req.file);
  // iska use karte hai to log the file which is being passed from the frontend
}

module.exports = {
  createFood,
};
