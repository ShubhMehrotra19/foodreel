const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {})
    .catch((err) => {});
}

module.exports = connectDb;
