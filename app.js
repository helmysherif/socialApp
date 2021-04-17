const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
let session = require("express-session");
let moment = require("moment-timezone");
let flash = require("connect-flash");
let mongoDBStore = require("connect-mongodb-session")(session);
let store = new mongoDBStore({
    uri: 'mongodb://localhost:27017/socialappdb',
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
mongoose.connect("mongodb://localhost:27017/socialappdb" , {useNewUrlParser : true , useUnifiedTopology : true}).then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
});
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});