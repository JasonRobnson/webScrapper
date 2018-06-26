let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan');
let  mongoose = require('mongoose');
let  axios = require('axios');
let  cheerio = require('cheerio');
let db = require('./models');
let  PORT = process.env.PORT || 3000;
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




let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webScrapperDB";

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
 });

//Routes

app.get("/articles", (req, res) => {
    db.Article.find({})
        .populate("comments")
        .then((dbArticle) => {
            res.render('articlesDashboard', {
                article: dbArticle

            });
        }).catch((err) => {
            console.log(err)
         })
});

//Get  route to scrap website
app.get("/articles/scrape", (req, res) => {
    axios.get("https://www.propublica.org/").then((response) => {

        let $ = cheerio
        .load(response.data);
        $("h1").each((i, element) => {

            let result = {};
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");
            result.summary = $(element).next("h2").text();
            result.byline = $(element).nextAll(".metadata").children(".byline").text();
            result.dateWritten = $(element).nextAll(".metadata").children(".timestamp").text();

            db.Article.create(result).then((dbArticle) => {
            }).catch((err) => {
                throw err
            });
        });
        res.redirect('/articles');
    });
}); 

app.post("/articles/:id", (req, res) => {
    console.log(req.body);
    db.Comment.create(req.body)
    .then((dbComment) => {
        console.log(req.params.id)
        return db.Article.findOneAndUpdate({ _id: req.params.id}, { $push: { comment: dbComment._id } }, {new: true});
    })
    .then((dbArticle) => {
        res.json(dbArticle)
    })
    .catch((err) => {
        res.json(err);
    })
});

app.get("/articles/notes/:id",(req, res) => {
    let articleNumber = req.params.id.slice(1);
    console.log("This is the articles/notes/:id" + articleNumber)
    db.Article.findOne({_id: articleNumber }).populate('comment').then((dbArticle) => {
            console.log(dbArticle);
            res.render('home', {
                article: dbArticle
            })
        })
        .catch((err) => {
            res.json(err);
        })
})


app.get("/articles/comment/:id", (req, res) => {
    db.Article.find({
        "_id": req.params.id.slice(1)
    }).then((dbArticle) => {
        res.render('comment', {
            article: dbArticle
         })
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/articles/delete/:id", (req, res) => {
    console.log(req.params.id.slice(1));
    db.Article.remove({
        "_id": req.params.id.slice(1),
    }).then((dbArticle) => {
        res.redirect('/articles')
    })

});

app.get("/", (req, res) => {
    res.render('index')
})



  


