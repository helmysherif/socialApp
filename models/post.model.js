const mongoose = require("mongoose");
let moment = require("moment-timezone");
const postSchema = mongoose.Schema({
    title:String,
    desc:String,
    posted_at:{
        type : Date,
        default : (new Date(Date.now()))
    },
    userID:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})
module.exports = mongoose.model('post' , postSchema);
// ()