if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: './backend/.env' });
}

const express = require("express");
const path = require("path");
const colors = require("colors");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require('connect-mongo');
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

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SECRET
  }
});

store.on("error", function (e) {
  console.log("session store error", err);
})

const sessionConfig = {
  store,
  name: '_dsfsf',
  secret: process.env.SECRET,
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

// serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => res.sendFile(__dirname, "../", "frontend", "build", "index.html"));
}

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