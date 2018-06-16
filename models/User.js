let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    commentedArticles: {
        type: Schema.Types.ObjectId,
        ref:"Comment"

    },
});

let User = mongoose.model("User", UserSchema);

module.exports = UserSchema;