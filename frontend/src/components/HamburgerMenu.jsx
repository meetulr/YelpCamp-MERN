import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function HamburgerMenu({ user, handleLogout }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [opacity, setOpacity] = useState(false);

  const toggleMenu = () => {
    if (isHidden) {
      setOpacity(false);

      setTimeout(() => {
        setOpacity(true);
      }, 500);
    }

    setIsOpen(!isOpen);
    setIsHidden(!isHidden);
  };

  return (
    <div>
      <button
        id="menu-btn"
        className={`${isOpen ? "open" : ""} items-center block hamburger mt-3 mr-2 md:hidden focus:outline-none`}
        onClick={toggleMenu}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>

      <div className={`${isHidden ? "hidden" : "absolute"} top-20 right-5`}>
        <div className={`${opacity ? "opacity-100 bg-slate-900" : "opacity-0 bg-slate-50"} transition-all duration-300 card`}>
          <ul className={`${opacity ? "opacity-100 bg-slate-900" : "opacity-0 bg-slate-50"} transition-all duration-300 opacity-0 m-3 flex flex-col menu menu-horizontal px-1 leading-3 space-x-0.5`}>
            <li>
              <Link onClick={toggleMenu} to="/" className={`p-3 ${location.pathname === "/" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Home</Link>
            </li>
            <li>
              <Link onClick={toggleMenu} to="/campgrounds" className={`p-3 ${location.pathname === "/campgrounds" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`} >Campgrounds</Link>
            </li>
            <li>
              <Link onClick={toggleMenu} to="/campgrounds/new" className={`p-3 ${location.pathname === "/campgrounds/new" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>New Campground</Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link onClick={toggleMenu} to="/login" className={`p-3 ${location.pathname === "/login" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Login</Link>
                </li>
                <li>
                  <Link onClick={toggleMenu} to="/register" className={`p-3 ${location.pathname === "/register" ? "font-bold" : ""} bg-transparent hover:bg-gray-700`}>Register</Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="btn btn-ghost p-3">LOGOUT</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu