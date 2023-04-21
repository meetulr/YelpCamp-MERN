import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div data-theme="dark">
        <div className="navbar bg-base-100">
          <div className="ml-3 mr-5 font-bold text-slate-50 text-xl align-items-center">
            <Link to="/">Yelpcamp</Link>
          </div>
          <div className="flex">
            <ul className="menu menu-horizontal px-1 leading-3 space-x-0.5">
              <li className="text">
                <Link to="/" className="p-3">Home</Link>
              </li>
              <li tabIndex={0}>
                <Link to="/campgrounds" className="p-3">Campgrounds</Link>
              </li>
              <li>
                <Link to="/campgrounds/new" className="p-3">New Campground</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar