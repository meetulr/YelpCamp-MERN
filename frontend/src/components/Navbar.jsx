import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div data-theme="dark">
      <div className="navbar bg-base-100">
        <div className="mx-3 font-bold text-slate-50 text-xl">
          <Link to="/">Yelpcamp</Link>
        </div>
        <div className="flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text">
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <Link to="/api/campgrounds">Campgrounds</Link>
            </li>
            <li>
              <Link to="/api/campgrounds/new">New</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar