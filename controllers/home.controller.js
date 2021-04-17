const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports.showHomePage = async(req, res) => {
    let posts = await postModel.find({}).populate('userID');
    res.render("home" , {posts , user : req.session.Username});
}
module.exports.handleLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
}
module.exports.addPost = async(req,res) => {
    const { title , desc } = req.body;
    await postModel.insertMany({ userID:req.session.userID , title , desc });
    res.redirect("/home");
}
module.exports.showSettingPage = (req, res) => {
    res.render("acount_setting" , {user : req.session.Username , usernameExists : req.flash('usernameExists') , wrongPassword : req.flash('wrongPass') , wrongPassConfirm : req.flash("wrongPassConfirm")})
}
module.exports.handleSettings = async(req, res) => {
    const {oldUsername,newUsername,oldPassword,newPassword,rePassword} = req.body;
    let user = await userModel.findOne({_id : req.session.userID});
    const match = await bcrypt.compare(oldPassword , user.password);
    if(user.username == oldUsername)
    {
        req.session.Username = newUsername;
        if(newPassword == rePassword)
        {
            if(match)
            {
                bcrypt.hash(newPassword , 7 , async function(err,hashedPassword){
                    await userModel.findByIdAndUpdate({_id:req.session.userID},{
                        username : newUsername,
                        password : hashedPassword
                    })
                })
                res.redirect("/home")   
            } else {
                req.flash('wrongPass' , true)
                res.redirect('/setting')
            }
        } else {
            req.flash('wrongPassConfirm' , true)
            res.redirect('/setting')
        }
    } else {
        req.flash('usernameExists' , true)
        res.redirect('/setting')
    }
}