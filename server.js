let express = require('express')
let bodyParser = require('body-parser')
let logger = require("morgan");
let  mongoose = require("mongoose");
let  axios = require("axios");
let  cheerio = require("cheerio");
let db = require("./models");
let  PORT = 3000;

//express to run the server
let app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/week18Populater");

//Routes

app.get("/", (req, res) => {

});



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
 });
  
