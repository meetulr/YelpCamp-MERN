const Campground = require("../models/campgroundModel");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = async (req, res) => {
  // console.log("hitting all campgrounds");
  const campgrounds = await Campground.find();
  res.json(campgrounds);
}


// @desc    create a campground
// @route   /api/campgrounds/new
// @access  Private
const createCampground = async (req, res) => {
  // console.log("hitting create campground");
  const geoData = await geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit: 1
  }).send()
  
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  res.json(campground);
}


// @desc    get selected campground
// @route   /api/campgrounds/:id
// @access  Public
const getCampground = async (req, res) => {
  // console.log("hitting selected campground");
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
  // console.log("hitting update campground");
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages && req.body.deleteImages.length) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
  }
  res.json(campground);
}


// @desc    delete selected campground
// @route   /api/campgrounds/:id
// @access  Private
const deleteCampground = async (req, res) => {
  // console.log("hitting delete campground");
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