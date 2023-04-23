import { useContext, useEffect } from "react";
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";

function Home() {
  const { dispatch } = useContext(FromLocationContext);

  const currUrl = window.location.pathname;

  console.log(`from ${currUrl}`);

  useEffect(() => {
    dispatch({
      type: "SET_LOCATION",
      payload: currUrl
    })
  }, [dispatch, currUrl])

  return (
    <div className="mt-24">Home</div>
  )
}

export default Home