const dbUrl = process.env.DB_URL;
// mongodb://127.0.0.1:27017/yelpCamp-MERN

const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    // console.log(dbUrl);
    await mongoose.connect(dbUrl);
    console.log("mongo connection open".cyan.underline);
  } catch (err) {
    console.log(`mongo connection error, ${err}`.red.underline.bold);
  }
}

module.exports = connectDB;