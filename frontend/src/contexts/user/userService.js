import axios from "axios";

const API_URL = "/api/users/";

// get user owned campgrounds
export const getOwnedCampgrounds = async (userId) => {
  const res = await axios.get(API_URL + userId);
  return res.data;
} 