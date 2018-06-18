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
// let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webScrapperDB";
mongoose.connect("mongodb://localhost/webScrapperDB");

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
 });

//Routes

//ROOT
app.get("/findall", (req, res) => {
    db.Article.find({}).then((dbArticle) => {
        console.log(dbArticle + "from the ROOT route")
        res.json(dbArticle)
    }).catch((err) => {
        console.log(err)
    })

});
//Gets  route to scrap website
app.get("/scrape", (req, res) => {
    axios.get("http://www.echojs.com/").then((response) => {
        console.log("first console.log" + response.data )
        let $ = cheerio
        .load(response.data);
        $("article h2").each((i, element) => {
            let result = {};
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");
            console.log( "This is the result" + result);
            db.Article.create(result).then((dbArticle) => {
                console.log("This is the DBarticle" + dbArticle);
            }).catch((err) => {
                throw err
            });
        });
        res.send("Scrape Complete!")
    });
}); 




  


