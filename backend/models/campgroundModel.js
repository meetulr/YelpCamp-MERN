const mongoose = require('mongoose');
const Review = require('./reviewModel')
const Schema = mongoose.Schema;
const { cloudinary } = require("../cloudinary");

const ImageSchema = new Schema({
  url: String,
  filename: String
});

const campgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })

    const images = doc.images;

    for (let image of images) {
      await cloudinary.uploader.destroy(image.filename);
    }
  }
})

module.exports = mongoose.model("Campground", campgroundSchema);