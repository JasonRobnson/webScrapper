let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    article: String, 
    body: String,
    
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;