const app = require("express").Router();
const auth = require("../middleware/auth2");
const registerValidation = require("../validator/register.validator");
const registerController = require("../controllers/register.controller");
app.get('/', auth , registerController.showRegisterForm);
app.post('/register', registerValidation , registerController.handleRegistration);
module.exports = app;