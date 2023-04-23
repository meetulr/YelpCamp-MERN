import { createContext, useReducer, useEffect } from "react";
import userReducer from "./userReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const initialState = {
        user,
        loading: false,
    }

    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        if(state.user){
            localStorage.setItem("user", JSON.stringify(state.user));
        }
        else{
            localStorage.removeItem("user");
        }
    }, [state])

    return <UserContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;