// create server
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("get request");
  res.send("running");
});

module.exports = app;
