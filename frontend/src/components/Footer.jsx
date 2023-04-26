import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const showFooterRegex = /^\/(campgrounds|login|register|profile)/;
  const showFooter = (location.pathname.match(showFooterRegex) !== null);

  return (
    <div className={`${!showFooter ? "hidden" : "mt-auto"}`} data-theme="dark">
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>&copy; YelpCamp 2023</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer