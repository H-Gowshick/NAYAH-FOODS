const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const DB = require("./connection");

const dotenv = require("dotenv");
dotenv.config();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const port = `${process.env["PORT"]}`;
app.listen(port, `${process.env["HOST"]}`, () => {
  console.log("Connection Succesfully done");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
const product = require("./router/Product");
app.use("/api", product);

const orders = require("./router/Orders");
app.use("/api", orders);

const login = require("./router/user");
app.use("/api", login);

console.log(`http://${process.env["HOST"]}:${process.env["PORT"]}`);
