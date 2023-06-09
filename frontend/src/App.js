import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { CampgroundProvider } from "./contexts/campground/campgroundContext";
import { UserProvider } from "./contexts/user/userContext";
import { FromLocationProvider } from "./contexts/fromLocation/fromLocationContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col h-screen relative">
      <CampgroundProvider>
        <UserProvider>
          <FromLocationProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campgrounds" element={<Index />} />
                <Route path="/campgrounds/new" element={<PrivateRoute />} >
                  <Route path="/campgrounds/new" element={<New />} />
                </Route>
                <Route path="/campgrounds/:campgroundId" element={<Show />} />
                <Route path="/campgrounds/:campgroundId/edit" element={<PrivateRoute />} >
                  <Route path="/campgrounds/:campgroundId/edit" element={<Edit />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute />} >
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Footer />
            </Router>
            <ToastContainer />
          </FromLocationProvider>
        </UserProvider>
      </CampgroundProvider>
    </div>
  );
}

export default App;
