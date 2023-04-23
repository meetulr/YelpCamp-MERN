const Campground = require("../models/campgroundModel");


// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = async (req, res) => {
  console.log("hitting all campgrounds");
  const campgrounds = await Campground.find();
  res.json(campgrounds);
}


// @desc    create a campground
// @route   /api/campgrounds/new
// @access  Private
const createCampground = async (req, res) => {
  console.log("hitting create campground");
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  res.json(campground);
}


// @desc    get selected campground
// @route   /api/campgrounds/:id
// @access  Public
const getCampground = async (req, res) => {
  console.log("hitting selected campground");
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  res.json(campground);
}


// @desc    update selected campground
// @route   /api/campgrounds/:id
// @access  Private
const updateCampground = async (req, res) => {
  console.log("hitting update campground");
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  res.json(campground);
}


// @desc    delete selected campground
// @route   /api/campgrounds/:id
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