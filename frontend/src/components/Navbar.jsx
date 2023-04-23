import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/user/userContext";
import HamburgerMenu from "./HamburgerMenu";
import Spinner from "./Spinner";
import axios from "axios";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {
  const location = useLocation();
  const { user, loading, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const handleRegister = () => {
    navigate("/register");
  }

  const handleLogout = async () => {
    dispatch({
      type: "SET_LOADING"
    });

    try {
      const res = await axios.get("/api/users/logout");

      dispatch({
        type: "CLEAR_USER"
      });

      toast.success("Successfully logged out");
      console.log(res.data);
      navigate("/campgrounds");
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: "STOP_LOADING"
    });
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div data-theme="dark">
        <div className="relative navbar bg-base-100 justify-between">
          <div>
            <div className="ml-3 mr-5 font-bold text-slate-50 text-xl align-items-center">
              <Link to="/">Yelpcamp</Link>
            </div>
            <div className="hidden md:flex">
              <ul className="menu menu-horizontal px-1 leading-3 space-x-0.5">
                <li>
                  <Link to="/" className={`p-3 ${location.pathname === "/" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Home</Link>
                </li>
                <li>
                  <Link to="/campgrounds" className={`p-3 ${location.pathname === "/campgrounds" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`} >Campgrounds</Link>
                </li>
                <li>
                  <Link to="/campgrounds/new" className={`p-3 ${location.pathname === "/campgrounds/new" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>New Campground</Link>
                </li>
              </ul>
            </div>
          </div>

          {!user ? (
            <div className="hidden md:flex ml-auto space-x-1">
              <button onClick={handleLogin} className={`btn btn-ghost ${location.pathname === "/login" ? "font-bold" : ""}`}><FaSignInAlt className="mr-2" /> Login</button>
              <button onClick={handleRegister} className={`btn btn-ghost ${location.pathname === "/register" ? "font-bold" : ""}`}><FaUser className="mr-2" /> Register</button>
            </div>
          ) : (
            <div className="hidden md:flex ml-auto">
              <button onClick={handleLogout} className="btn btn-ghost"><FaSignOutAlt className="mr-2" /> LOGOUT</button>
            </div>
          )}

          <HamburgerMenu user={user} handleLogout={handleLogout}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar