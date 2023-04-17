const express = require("express");
const campgrounds = require("../controllers/campgroundsController");
const router = express.Router();

router.get("/", campgrounds.getCampgrounds);

router.post("/new", campgrounds.createCampground);

module.exports = router;