var express = require("express");
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
// var {v1 as uuidv1} = require("uuid");
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
  const noteData = req.body
  noteData.id = Math.floor(Math.random() * 1000)
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

app.delete("/api/notes/:id", (req, res) => {
  var id = req.params.id;

  fs.readFile("./db/db.json", function(err, data){
    if(err){
      throw err;
    }
    const originalData = [].concat(JSON.parse(data))

    const filterData = originalData.filter(function(data){
      return data.id == id;
      // if(data.id == id){
      //   return false
      // }
      // return true
    })
    console.log(filterData)
    fs.writeFile("./db/db.json", JSON.stringify(filterData), function(err){
      if(err){
        throw err;
      };
      res.send(201)
    });
  })
});


app.listen(PORT, () => {
  console.log("App listening on Port " + PORT);
});