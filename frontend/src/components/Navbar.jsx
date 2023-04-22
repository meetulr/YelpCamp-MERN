import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsHidden(!isHidden);
  };

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

          <button
            id="menu-btn"
            className={`${isOpen ? "open" : ""} items-center block hamburger mt-3 mr-2 md:hidden focus:outline-none`}
            onClick={toggleMenu}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>

          <div className={`${isHidden ? "hidden" : "absolute"} transition-all delay-500 duration-500 top-20 left-60`}>
            <div className="card bg-slate-950">
              <ul className="my-3 flex flex-col menu menu-horizontal px-1 leading-3 space-x-0.5">
                <li>
                  <Link onClick={toggleMenu} to="/" className={`p-3 ${location.pathname === "/" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Home</Link>
                </li>
                <li>
                  <Link onClick={toggleMenu} to="/campgrounds" className={`p-3 ${location.pathname === "/campgrounds" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`} >Campgrounds</Link>
                </li>
                <li>
                  <Link onClick={toggleMenu} to="/campgrounds/new" className={`p-3 ${location.pathname === "/campgrounds/new" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>New Campground</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar