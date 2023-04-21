const express = require("express");
const campgrounds = require("../controllers/campgroundsController");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validateCampground } = require("../middlewares");

router.route("/")
  .get(catchAsync(campgrounds.getCampgrounds))
  .post(validateCampground, catchAsync(campgrounds.createCampground))


router.route("/:id")
  .get(catchAsync(campgrounds.getCampground))
  .put(validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(catchAsync(campgrounds.deleteCampground))


module.exports = router;