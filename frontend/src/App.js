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
            <Route path="/api/campgrounds" element={<Index />} />
            <Route path="/api/campgrounds/new" element={<New />} />
            <Route path="/api/campgrounds/:id" element={<Show />} />
            <Route path="/api/campgrounds/:id/edit" element={<Edit />} />
          </Routes>
          <Footer />
        </Router>
      </CampgroundProvider>
    </div>
  );
}

export default App;
