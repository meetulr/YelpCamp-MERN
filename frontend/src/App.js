import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import PageNotFound from "./pages/PageNotFound";
import { CampgroundProvider } from "./contexts/campground/campgroundContext";
import { ReviewProvider } from "./contexts/review/reviewContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col h-screen relative">
      <CampgroundProvider>
        <ReviewProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campgrounds" element={<Index />} />
              <Route path="/campgrounds/new" element={<New />} />
              <Route path="/campgrounds/:campgroundId" element={<Show />} />
              <Route path="/campgrounds/:campgroundId/edit" element={<Edit />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
          <ToastContainer />
        </ReviewProvider>
      </CampgroundProvider>
    </div>
  );
}

export default App;
