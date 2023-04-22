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
    res.json(registeredUser);
  } catch (error) {
    res.json(error);
  }
};


// @desc    login as user
// @route   /api/users/login
// @access  Public
const login = (req, res) => {
  res.send("successfully logged in");
};

const logout = (req, res) => {
};

module.exports = {
  register,
  login,
  logout
}