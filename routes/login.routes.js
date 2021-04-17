const app = require("express").Router();
const auth = require("../middleware/auth2");
const LoginController = require("../controllers/login.controller");
app.get('/login', auth , LoginController.showLoginPage);
app.post('/handlelogin', LoginController.handleLogin);
module.exports = app;