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

// create campground
export const createCampground = async (campgroundData) => {
  const res = await axios.post(API_URL, campgroundData);
  return res.data;
}

// update campground
export const updateCampground = async (campgroundId, campgroundData) => {
  const res = await axios.put(API_URL + campgroundId, campgroundData);
  return res.data;
}