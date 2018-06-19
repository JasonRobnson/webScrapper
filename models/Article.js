let mongoose = require('mongoose');


let Schema = mongoose.Schema; 
// headline, url, summary, anything else I want

let ArticleSchema = new Schema({
    title: {
        type: String,
        // required: true
    },
    link: {
        type: String, 
        // required: true  
    },
    // url: {
    //     type: String,
    //     // required: true
    // },
    // byline: {
    //     type: String, 
    //     // required: true
    // },
    //This populates an Article and attatches a relevant comment
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});
//this builds our model from the Schema, using Mongoose model method
let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;