const express = require("express");
const campgrounds = require("../controllers/campgroundsController");
const router = express.Router();

router.route("/")
  .get(campgrounds.getCampgrounds)
  .post(campgrounds.createCampground)

router.post("/new", campgrounds.createCampground);

router.route("/:id")
  .get(campgrounds.getCampground)
  .put(campgrounds.updateCampground)
  .delete(campgrounds.deleteCampground)


module.exports = router;