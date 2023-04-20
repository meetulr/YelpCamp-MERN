import { createContext, useReducer } from "react";
import campgroundReducer from "./campgroundReducer";

const CampgroundContext = createContext();


export const CampgroundProvider = ({children}) => {
  const initialState = {
    campgrounds: [],
    campground: {},
    loading: false
  }

  const [state, dispatch] = useReducer(campgroundReducer, initialState);

  return <CampgroundContext.Provider value={{
    ...state,
    dispatch
  }}>
    {children}
  </CampgroundContext.Provider>
}


export default CampgroundContext;