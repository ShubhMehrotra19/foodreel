// create server
const express = require("express");
const cookieparser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cookieparser());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("get request");
  res.send("running");
});

app.use("/api/auth", authRoutes);
// tumhare application mein auth related api exist karti hai ye hamne iske through app ko bataya

module.exports = app;
