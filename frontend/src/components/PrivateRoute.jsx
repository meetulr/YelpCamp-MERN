import { useContext, useEffect } from "react";
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function PrivateRoute() {

  const { loggedIn, loading } = useAuthStatus();

  const { dispatch } = useContext(FromLocationContext);

  const currUrl = window.location.pathname;

  useEffect(() => {
    dispatch({
      type: "SET_LOCATION",
      payload: currUrl
    })
  }, [dispatch, currUrl])

  if (loading) {
    return <Spinner />
  }

  if (!loggedIn) {
    toast.error("You need to be logged in");
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;