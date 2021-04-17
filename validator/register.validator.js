const { check } = require("express-validator");
module.exports = [
    check('fname').matches(/^[a-zA-Z]+([\ A-Za-z-]+)*$/),
    check('lname').matches(/^[a-zA-Z]+([\ A-Za-z-]+)*$/),
    check('username').matches(/^[a-zA-Z]+([\ A-Za-z-]+)*$/),
    check("email").isEmail(),
    check("password").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
]