const { campgroundSchema, reviewSchema } = require("./utils/schemas");
const ExpressError = require("./utils/ExpressError");

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(msg, 400);
  }
  else {
      next();
  }
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl
      res.status(401).json("Not Authorized");
  }
  next();
}