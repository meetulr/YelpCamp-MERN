import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

function Navbar() {
  const location = useLocation();

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
                  <Link to="/home" className={`p-3 ${location.pathname === "/home" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Home</Link>
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

          <HamburgerMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar