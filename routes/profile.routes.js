const app = require("express").Router();
const ProfileController = require("../controllers/profile.controller");
app.get('/profile', ProfileController.showProfilePage);
app.post('/editPost', ProfileController.EditPost);
app.post('/deletePost', ProfileController.deletePost);
module.exports = app;