const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgroundsController");
const catchAsync = require("../utils/catchAsync");
const { validateCampground, isLoggedIn, isCampgroundAuthor } = require("../middlewares");
const multer = require('multer');
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.route("/")
  .get(catchAsync(campgrounds.getCampgrounds))
  .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgrounds.createCampground))


router.route("/:id")
  .get(catchAsync(campgrounds.getCampground))
  .put(isLoggedIn, isCampgroundAuthor, upload.array('images'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isCampgroundAuthor, catchAsync(campgrounds.deleteCampground))


module.exports = router;