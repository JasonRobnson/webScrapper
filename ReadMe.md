# BurgerBurger
A simple FullStack-App that creates burger, and destroys burger


# Tools

The tools that I used for this project were:

- Node.js
- Mysql 
- Express.js
- JQUERY
- HandleBars.js
- Heroku
- GitHub
- Nodemon.js
- DocToc (Table of Contents)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*
- [Frontend](#Frontend)
  - [Materialize](#Materialize)
  - [JQUERY](#Jquery.js)

- [Backend](#Backend)
 - [Node.js](#Node.js)
 - [MongoDB](#MongoDB)
 - [Mongoose.js](#Mongoose)
 - [Express.js](#Express.js)
 - [Nodemon](#Nodemon.js)
 - [Morgan](#Morgan)
 - [Axios](#Axios)
 - [Cheerio.js](#Cheerio)
 - [Express-Handlebars.js](#Express-Handlebars.js)

- [Development Tools](#development-tools)
 - [Heroku](#Heroku)
 - [GitHub](#GitHub)
 - [DocToc](#DocToc)
 

let logger = require('morgan');
let  mongoose = require('mongoose');
let  axios = require('axios');
let  cheerio = require('cheerio');
let db = require('./models');
let  PORT = 3000;
let expHbs = require('express-handlebars');

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### Required File Structure
WebScrapper > models + public + views


### commands

- `nodemon server.js`: will get the app up and running after all dependencies are installed. 
