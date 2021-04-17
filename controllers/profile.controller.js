const postModel = require("../models/post.model");
module.exports.showProfilePage = async(req, res) => {
    let posts = await postModel.find({userID : req.session.userID});
    res.render("profile" , {posts , user : req.session.Username});
}
module.exports.EditPost = async(req, res) => {
    const {_id , title , desc} = req.body;
    await postModel.findByIdAndUpdate({_id} , {title , desc});
    res.redirect("/profile")
}
module.exports.deletePost = async(req, res) => {
    await postModel.findByIdAndDelete({_id : req.body.ID})
    res.redirect("/home");
}