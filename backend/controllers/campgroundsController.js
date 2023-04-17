const Campground = require("../models/campgroundModel");


// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = async (req,res) => {
  const camp = new Campground({
    title: "test",
    price: 69,
    description: "test",
    location: "test",
  })

  await camp.save();

  res.send(camp);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Private
const createCampground = (req,res) => {
  res.send(req.body);
}

module.exports = {
  getCampgrounds,
  createCampground,
}