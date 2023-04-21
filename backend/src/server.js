const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const campgroundRoutes = require("./routes/campgroundsRoutes");
const connectDB = require("./config/db");
const ExpressError = require("./utils/ExpressError");

const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello")
})

app.use("/api/campgrounds", campgroundRoutes);

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