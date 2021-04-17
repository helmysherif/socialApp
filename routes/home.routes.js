const app = require("express").Router();
const auth = require("../middleware/auth");
const HomeController = require("../controllers/home.controller");
app.get('/home', auth , HomeController.showHomePage);
app.get('/setting', auth , HomeController.showSettingPage);
app.get('/logout', HomeController.handleLogout);
app.post('/addPost', HomeController.addPost);
app.post('/handleSettings', HomeController.handleSettings);
module.exports = app;