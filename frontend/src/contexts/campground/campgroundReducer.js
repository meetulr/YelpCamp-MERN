const campgroundReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        campgrounds: [],
        campground: {},
        loading: true
      }
    case "STOP_LOADING":
      return {
        ...state,
        loading: false
      }
    case "GET_CAMPGROUND":
      return {
        ...state,
        campground: action.payload
      }
    case "GET_CAMPGROUNDS":
      return {
        ...state,
        campgrounds: action.payload
      }
    default:
      return state;
  }
}

export default campgroundReducer;