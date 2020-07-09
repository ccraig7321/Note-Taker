var express = require("express");
var path = require("path");
var fs = require("fs");
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post("/api/notes", (req, res) => {
  console.log(req.body)
  fs.readFile("./db/db.json", function(err, data){
    if(err){
      throw err;
    }
    const originalData = [].concat(JSON.parse(data))
    console.log(typeof newData)
    
    fs.writeFile("./db/db.json", JSON.stringify([...originalData, req.body]), function(err){
      if(err){
        throw err;
      };
      res.send(201)
    });
  })

});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", function(err, data){
    if(err){
      throw err;
    }
    res.json(JSON.parse(data))
  })
})



app.listen(PORT, () => {
  console.log("App listening on Port " + PORT);
});