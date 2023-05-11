const { campgroundSchema, reviewSchema } = require("./utils/schemas");
const Campground = require("./models/campgroundModel");
const Review = require("./models/reviewModel");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      // console.log("not logged in");
      res.status(401).json("Not Authorized");
      return;
  }
  next();
}

// campground middleware
module.exports.isCampgroundAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
      return res.json("Not authorized");
  }
  next();
}

// campground middleware
module.exports.validateCampground = (req, res, next) => {
  // console.log("hitting validate campground");
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(msg, 400);
  }
  else {
      next();
  }
}

// review middleware
module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
      return res.json("Not Authorized");
  }
  next();
}

// review middleware
module.exports.validateReview = (req, res, next) => {
  // console.log("hitting validate review");
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}
