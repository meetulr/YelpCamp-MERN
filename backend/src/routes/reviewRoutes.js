const express = require("express");
const router = express.Router({mergeParams: true});
const reviews = require("../controllers/reviewsController");
const catchAsync = require("../utils/catchAsync");
const { validateReview } = require("../middlewares");


router.post("/", validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", catchAsync(reviews.deleteReview));


module.exports = router;