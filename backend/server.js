// start server
const app = require("./src/app");
const connectDb = require("./src/db/db");
require("dotenv").config(); // ise likhna padega after npm i dotenv, warna process.env walo ki value undefined aayegi

connectDb();

app.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});
