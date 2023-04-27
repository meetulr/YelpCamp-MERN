if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");
const campgroundRoutes = require("./routes/campgroundsRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/userModel");
const mongoSanitize = require("express-mongo-sanitize");

const PORT = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
  name: '_dsfsf',
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());


app.use("/api/users", userRoutes);
app.use("/api/campgrounds", campgroundRoutes);
app.use("/api/campgrounds/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) { err.message = "something went wrong"; }
  res.status(statusCode).json(err);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.magenta.underline);
})