const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgroundsController");
const catchAsync = require("../utils/catchAsync");
const { validateCampground, isLoggedIn, isCampgroundAuthor } = require("../middlewares");

router.route("/")
  .get(catchAsync(campgrounds.getCampgrounds))
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))


router.route("/:id")
  .get(catchAsync(campgrounds.getCampground))
  .put(isLoggedIn, isCampgroundAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.deleteCampground))


module.exports = router;