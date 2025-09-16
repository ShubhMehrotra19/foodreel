const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect("mongodb://localhost:27017/foodreels")
    .then(() => {
      console.log("db connected ✅");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDb;
