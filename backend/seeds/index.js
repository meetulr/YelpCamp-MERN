const mongoose = require("mongoose");
const colors = require("colors");
const Campground = require("../models/campgroundModel");
const connectDB = require("../config/db");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

connectDB();

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})