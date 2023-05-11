const mongoose = require("mongoose");
const colors = require("colors");
const Campground = require("../models/campgroundModel");
// const connectDB = require("../config/db");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// mongodb://127.0.0.1:27017/yelpCamp-MERN

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://meetr:Meetul123@cluster0.toa1pd5.mongodb.net/");
    console.log("mongo connection open".cyan.underline);
  } catch (err) {
    console.log(`mongo connection error, ${err}`.red.underline.bold);
  }
}

connectDB();

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 240; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "645ce1dbd989fa49aab538ef",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur...',
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dmikuw8zs/image/upload/v1683811975/YelpCamp-MERN/n4vseknc6bavbqpgdr9x.jpg",
          filename: "YelpCamp-MERN/n4vseknc6bavbqpgdr9x"
        },
        {
          url: "https://res.cloudinary.com/dmikuw8zs/image/upload/v1683811976/YelpCamp-MERN/gkseq4twcu4632svsnna.jpg",
          filename: "YelpCamp-MERN/gkseq4twcu4632svsnna"
        }
      ],
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      }
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})