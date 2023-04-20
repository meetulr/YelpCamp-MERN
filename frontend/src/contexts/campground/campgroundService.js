import axios from "axios";

const API_URL = "/api/campgrounds/";

// get all campgrounds
export const getCampgrounds = async () => {
  const res = await axios.get(API_URL);
  return res.data;
}

// get selected campground
export const getCampground = async (campgroundId) => {
  const res = await axios.get(API_URL + campgroundId);
  return res.data;
}