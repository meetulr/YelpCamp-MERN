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
        campground: action.payload,
        loading: false
      }
    case "GET_CAMPGROUNDS":
      return {
        ...state,
        campgrounds: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

export default campgroundReducer;