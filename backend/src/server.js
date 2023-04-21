const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const campgroundRoutes = require("./routes/campgroundsRoutes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello")
})

app.use("/api/campgrounds", campgroundRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.magenta.underline);
})