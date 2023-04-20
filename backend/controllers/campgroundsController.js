const Campground = require("../models/campgroundModel");


// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find();
  res.json(campgrounds);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/new
// @access  Private
const createCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id
// @access  Public
const getCampground = async (req, res) => {
  console.log("hitting");
  const campground = await Campground.findById(req.params.id);
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id/edit
// @access  Private
const updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  res.json(campground);
}


// @desc    get all the campgrounds
// @route   /api/campgrounds/:id/edit
// @access  Private
const deleteCampground = async (req, res) => {
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