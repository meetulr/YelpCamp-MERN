const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require("../controllers/userController");
const passport = require('passport');

router.post("/users/register", catchAsync(users.register));

router.post("/users/login", passport.authenticate('local'), catchAsync(users.login));

router.get("/users/logout", catchAsync(users.logout));

module.exports = router;