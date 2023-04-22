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
              user: action.payload,
              loading: false
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