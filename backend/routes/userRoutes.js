const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require("../controllers/userController");
const passport = require('passport');
const { isLoggedIn } = require('../middlewares');

router.post("/register", catchAsync(users.register));

router.post("/login", passport.authenticate('local'), catchAsync(users.login));

router.get("/logout", catchAsync(users.logout));

router.get("/:userId", isLoggedIn, catchAsync(users.getOwnedCampgrounds));

module.exports = router;