const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports.showLoginPage = (req, res) => {
    res.render("index" , {exists : req.flash("exists") , pass : req.flash('inncorrentPass')});
}
module.exports.handleLogin = async(req, res) => {
    const {email , password} = req.body;
    let user = await userModel.findOne({email});
    if(user)
    {
        const match = await bcrypt.compare(password , user.password)
        if(match)
        {
            req.session.isLoggedIn = true;
            req.session.userID = user._id;
            req.session.Username = user.username;
            res.redirect("/home");
        } else {
            req.flash('inncorrentPass' , true)
            res.redirect("/login");
        }
    } else {
        req.flash('exists' , true)
        res.redirect("/login");   
    }
}