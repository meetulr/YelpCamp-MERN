// @desc    get all the campgrounds
// @route   /api/campgrounds
// @access  Public
const getCampgrounds = (req,res) => {
  res.send("get campgrounds");
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