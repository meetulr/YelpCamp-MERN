import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Page not found");
    navigate("/campgrounds");

    // eslint-disable-next-line
  }, [])

  return (
    <></>
  )
}

export default PageNotFound