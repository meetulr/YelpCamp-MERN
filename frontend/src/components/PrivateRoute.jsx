import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function PrivateRoute() {

    const { loggedIn, loading } = useAuthStatus();

    if (loading) {
      return <Spinner />
    }

    if(!loggedIn){
      toast.error("You need to be logged in");
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />
  }

export default PrivateRoute;