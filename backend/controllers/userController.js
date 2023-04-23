const User = require('../models/userModel');

// @desc    register new user
// @route   /api/users/register
// @access  Public
const register = async (req, res) => {
  console.log("hitting register user");

  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    const newUser = {
      _id: registeredUser._id,
      email: registeredUser.email
    }

    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
};


// @desc    login user
// @route   /api/users/login
// @access  Public
const login = async (req, res) => {
  const newUser = {
    _id: req.user._id,
    email: req.user.email
  }
  res.json(newUser);
};


// @desc    logout user
// @route   /api/users/logout
// @access  Private
const logout = async (req, res) => {
  req.logout();
  res.json("logged out");
};

module.exports = {
  register,
  login,
  logout
}