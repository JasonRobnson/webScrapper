let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan');
let  mongoose = require('mongoose');
let  axios = require('axios');
let  cheerio = require('cheerio');
let db = require('./models');
let  PORT = 3000;
let expHbs = require('express-handlebars');

//express to run the server
let app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//initializing handlebars.js views
app.engine('handlebars', expHbs({
    defaultLayout: 'main',
    partialsPath: 'partials'
}));
app.set('view engine', 'handlebars');



// Connect to the Mongo DB
// let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webScrapperDB";
mongoose.connect("mongodb://localhost/webScrapperDB");

app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
 });

//Routes

//ROOT
app.get("/getAll", (req, res) => {
    db.Article.find({}).then((dbArticle) => {
        res.render('articlesDashboard', {
            article: dbArticle,

        });
    }).catch((err) => {
        console.log(err)
    })
});
//Gets  route to scrap website
app.get("/scrape", (req, res) => {
    axios.get("https://www.propublica.org/").then((response) => {
        // console.log("first console.log" + response.data )
        let $ = cheerio
        .load(response.data);
        $("h1").each((i, element) => {

            let result = {};

            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");
            result.summary = $(element).next("h2").text();
            result.byline = $(element).nextAll(".metadata").children(".byline").text();
            result.dateWritten = $(element).nextAll(".metadata").children(".timestamp").text();
            
            console.log( "This is the result" + result);
            db.Article.create(result).then((dbArticle) => {
                console.log("This is the DBarticle" + dbArticle);
            }).catch((err) => {
                throw err
            });
        });
        res.render('articlesDashboard');
    });
}); 

app.post("/submit", (req, res) => {
    console.log(req.body)
    db.Comment.create(req.body) 
    .then((dbComment) => {
        return db.Article.findOneAndUpdate({}, { $push: { Comment: dbComment_id } }, {new: true});
    })
    .then((dbComment) => {
        // res.json(dbComment);
        res.send("articlesDashboard")
    })
    .catch((err) => {
        rs.json(err);
    });
});

app.get("/comment/form", (req, res) => {
    res.render('comment');
})

app.get("delete/:id", (req, res) => {

})

app.get("/", (req, res) => {
    res.render('index');
})




  


