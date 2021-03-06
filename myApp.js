var express = require("express");
var app = express();
var bGround = require("fcc-express-bground");
require("dotenv").config();
var bodyParser = require("body-parser");

// middleware - for every request it logs method path & ip
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// mount body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// console.log("Hello World");

// sends a single string
// app.get("/", function(req, res) {
//   res.send('Hello Express');
// })

// sends index.html file
// __dirname Gives absolute path of the directory that contains the currently executing file.
app.get("/", (req, res) => {
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

// public folder which contains CSS
app.use("/public", express.static(__dirname + "/public"));

// json data at URL/json
app.get("/json", (req, res) => {
  console.log(process.env.MESSAGE_STYLE, "<= message style");
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// chained middleware - returns current time
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

// Get Route Parameter Input from the Client. Returns word entered in url.
app.get("/:word/echo", (req, res) => {
  // res.json({ echo: req.params.word });
  // above word object deconstrusted
  const { word } = req.params;
  res.json({ echo: word });
});

//encoding the data after the route path, using a query string
// i.e - http://localhost:3000/name?first=Ket&last=Patel
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

// Get Data from POST Requests
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
