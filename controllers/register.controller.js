const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
module.exports.showRegisterForm = (req, res) => {
    if(req.session.isLoggedIn)
    {
        res.render("home" , {user : req.session.Username});
    } else {
        res.render("registration" , {errors : req.flash("errors") , oldInput : req.flash('oldInput') , exists : req.flash('emailExists')});
    }
}
module.exports.handleRegistration = async(req, res) => {
    const {fname , lname , username , email , password} = req.body;
    let errors = validationResult(req);
    if(errors.isEmpty())
    {
        let user = await userModel.findOne({email});
        if(user)
        {
            req.flash('emailExists' , true)
            res.redirect("/")
        } else {
            bcrypt.hash(password , 7 , async function(err,hashedPassword){
                await userModel.insertMany({fname , lname , username , email , password : hashedPassword});
                res.redirect("/login");
            })
        }
    } else {
        req.flash('errors' , errors.array());
        req.flash('oldInput' , {fname , lname , username , email , password})
        res.redirect("/")
    }
}