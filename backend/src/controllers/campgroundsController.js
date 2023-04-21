const Campground = require("../models/campgroundModel");


// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = async (req, res) => {
  console.log("hitting all campgrounds");
  const campgrounds = await Campground.find();
  res.json(campgrounds);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/new
// @access  Private
const createCampground = async (req, res) => {
  console.log("hitting create campground");
  const campgroundData = req.body;
  campgroundData.image = "https://source.unsplash.com/collection/483251";
  const campground = new Campground(campgroundData);
  await campground.save();
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id
// @access  Public
const getCampground = async (req, res) => {
  console.log("hitting selected campground");
  const campground = await Campground.findById(req.params.id);
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id/edit
// @access  Private
const updateCampground = async (req, res) => {
  console.log("hitting update campground");
  const { id } = req.params;
  const campgroundData = req.body;
  campgroundData.image = "https://source.unsplash.com/collection/483251";
  const campground = await Campground.findByIdAndUpdate(id, campgroundData, { new: true });
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id/edit
// @access  Private
const deleteCampground = async (req, res) => {
  console.log("hitting delete campground");
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  res.json(campground);
}


module.exports = {
  getCampgrounds,
  createCampground,
  getCampground,
  updateCampground,
  deleteCampground,
}