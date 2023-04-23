const express = require("express");
const router = express.Router({mergeParams: true});
const reviews = require("../controllers/reviewsController");
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn } = require("../middlewares");


router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, catchAsync(reviews.deleteReview));


module.exports = router;