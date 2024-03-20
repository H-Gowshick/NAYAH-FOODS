const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = mongoose
  .connect(`${process.env.URL}`, { family: 4 })
  .then(console.log("Mongodb connected succesfully"))
  .catch((error) => console.log(error));

module.exports = { DB };
