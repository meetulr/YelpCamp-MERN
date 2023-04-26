import { useContext, useEffect } from "react";
import UserContext from "../contexts/user/userContext";
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const { dispatch: locationDispatch } = useContext(FromLocationContext);
  const { user, loading, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const currUrl = window.location.pathname;

  console.log(`from ${currUrl}`);

  useEffect(() => {
    locationDispatch({
      type: "SET_LOCATION",
      payload: currUrl
    })
  }, [locationDispatch, currUrl])

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
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: "STOP_LOADING"
    });
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-cover bg-center flex flex-col h-full w-full" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="flex flex-col h-full max-w-6xl mx-auto p-4">
          <header className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-50">YelpCamp</h3>
            <nav className="flex justify-center space-x-3">
              {user ? (
                <>
                  <Link to="/profile" className="btn btn-ghost font-bold">Profile</Link>
                  <button onClick={handleLogout} className="btn btn-ghost font-bold">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost font-bold">Login</Link>
                  <Link to="/register" className="btn btn-ghost font-bold">Register</Link>
                </>
              )}
            </nav>
          </header>
          <main className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-5xl font-bold mb-8">YelpCamp</h1>
            <p className="text-center">
              Welcome to YelpCamp!
            </p>
            <p className="text-center mb-8">Jump right in and explore our many campgrounds. Feel free to share some of your own
              and comment on others!</p>
            <Link to="/campgrounds"
              className="btn btn-secondary font-bold text-gray-900 bg-white border-white py-4 px-8 rounded-full hover:bg-gray-300 transition duration-300 ease-in-out"
            >View Campgrounds</Link>
          </main>
          <footer className="mt-8 text-center text-gray-500">
            <p>&copy; 2023</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Home