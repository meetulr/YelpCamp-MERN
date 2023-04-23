const fromLocationReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        prevUrl: action.payload
      }
    case "CLEAR_LOCATION":
      return {
        ...state,
        prevUrl: null
      }
    default:
      return state;
  }
}

export default fromLocationReducer;