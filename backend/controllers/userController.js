const User = require('../models/userModel');

// @desc    register new user
// @route   /api/users/register
// @access  Public
const register = async (req, res, next) => {
  console.log("hitting register user");

  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, err => {
      if (err) {
        return next(err);
      }
    })

    const newUser = {
      _id: registeredUser._id,
      username: registeredUser.username,
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
    username: req.user.username,
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