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
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6444e622cc6dcfd7efc45189",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur...',
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dmikuw8zs/image/upload/v1682336252/YelpCamp-MERN/zalmwxxbly2pzdqtwgky.jpg",
          filename: "YelpCamp-MERN/zalmwxxbly2pzdqtwgky"
        },
        {
          url: "https://res.cloudinary.com/dmikuw8zs/image/upload/v1682336254/YelpCamp-MERN/bhcuigsztozw0xp7y3x6.jpg",
          filename: "YelpCamp-MERN/bhcuigsztozw0xp7y3x6"
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})