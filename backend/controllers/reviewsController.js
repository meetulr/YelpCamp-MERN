const Campground = require("../models/campgroundModel");
const Review = require("../models/reviewModel");

// @desc    create a review
// @route   /api/campgrounds/:id/reviews
// @access  Private
const createReview = async (req, res) => {
  console.log("hitting create review");
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.json({ review, campground });
}


// @desc    delete selected review
// @route   /api/campgrounds/:id/reviews/:reviewId
// @access  Private
const deleteReview = async (req, res) => {
  console.log("hitting delete review");
  const { id, reviewId } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true });
  await Review.findByIdAndDelete(reviewId);
  res.json(campground);
}


module.exports = {
  createReview,
  deleteReview
}