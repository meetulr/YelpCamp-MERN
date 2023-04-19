import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Campground from "./pages/Campground";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/campgrounds" element={<Index />} />
          <Route path="/api/campgrounds/new" element={<New />} />
          <Route path="/api/campgrounds/:id" element={<Campground />} />
          <Route path="/api/campgrounds/:id/edit" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
