const express = require("express");
const campgrounds = require("../controllers/campgroundsController");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

router.route("/")
  .get(catchAsync(campgrounds.getCampgrounds))
  .post(catchAsync(campgrounds.createCampground))

  
router.route("/:id")
  .get(catchAsync(campgrounds.getCampground))
  .put(catchAsync(campgrounds.updateCampground))
  .delete(catchAsync(campgrounds.deleteCampground))


module.exports = router;