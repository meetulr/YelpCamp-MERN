const userReducer = (state, action) => {
  switch (action.type) {
      case "SET_LOADING":
          return {
              ...state,
              loading: true
          }
      case "STOP_LOADING":
          return {
              ...state,
              loading: false
          }
      case "SET_USER":
          return {
              ...state,
              user: action.payload
          }
      case "GET_OWNED_CAMPGROUNDS":
        return {
          ...state,
          ownedCampgrounds: action.payload
        }
      case "CLEAR_USER":
          return {
              ...state,
              user: null
          }
      default:
          return state;
  }
}

export default userReducer;