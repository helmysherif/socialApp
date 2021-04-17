const express = require('express');
const path = require("path");
const port = 3000;
const mongoose = require("mongoose");
let session = require("express-session");
let flash = require("connect-flash");
let mongoDBStore = require("connect-mongodb-session")(session);
let store = new mongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.p5ug5.mongodb.net/socialappdb',
    collection: 'mySessions'
})
const app = express();
app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret : "keyboard cat",
    resave : false,
    saveUninitialized : false,
    store
}))
app.use(flash());
app.use(require("./routes/register.routes"));
app.use(require("./routes/login.routes"));
app.use(require("./routes/home.routes"));
app.use(require("./routes/profile.routes"));
mongoose.connect("mongodb+srv://admin:admin@cluster0.p5ug5.mongodb.net/socialappdb" , {useNewUrlParser : true , useUnifiedTopology : true}).then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
});
app.listen(process.env.PORT || port, () => {
    console.log('App listening on port 3000!');
});