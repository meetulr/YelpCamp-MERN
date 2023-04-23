import { createContext, useReducer } from "react";
import fromLocationReducer from "./fromLocationReducer";

const FromLocationContext = createContext();

export const FromLocationProvider = ({children}) => {
  const initialState = {
    prevUrl: ""
  }

  const [state, dispatch] = useReducer(fromLocationReducer, initialState);

  return <FromLocationContext.Provider value={{
    ...state,
    dispatch
  }}>
    {children}
  </FromLocationContext.Provider>
}


export default FromLocationContext;