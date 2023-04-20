import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import { CampgroundProvider } from "./contexts/campground/campgroundContext";

function App() {
  return (
    <div className="flex flex-col h-screen relative">
      <CampgroundProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campgrounds" element={<Index />} />
            <Route path="/campgrounds/new" element={<New />} />
            <Route path="/campgrounds/:campgroundId" element={<Show />} />
            <Route path="/campgrounds/:campgroundId/edit" element={<Edit />} />
          </Routes>
          <Footer />
        </Router>
      </CampgroundProvider>
    </div>
  );
}

export default App;
