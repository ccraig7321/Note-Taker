var express = require("express");
var path = require("path");
// var fs = require("fs");
var bodyParser = require("body-parser");
// var mysql = require("mysql");
// var request = require("request");
// var Sequelize = require("sequelize");
// var Twitter = requi'twitter');
// var nodemailer = require('nodemailer');
// var db = require("./models");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, './public')));
var PORT = process.env.PORT || 8080;

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});


app.listen(PORT, () => {
  console.log("App listening on Port " + PORT);
});