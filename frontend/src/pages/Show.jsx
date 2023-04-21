import { useContext, useEffect } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function Show() {
  const { campground, loading, dispatch } = useContext(CampgroundContext);

  const params = useParams();
  const { campgroundId } = params;

  useEffect(() => {
    const fetchCampground = async () => {
      dispatch({
        type: "SET_LOADING"
      })

      try {
        const data = await getCampground(campgroundId);

        dispatch({
          type: "GET_CAMPGROUND",
          payload: data
        })

        console.log(data);
      } catch (error) {
        console.log(error);

        dispatch({
          type: "STOP_LOADING"
        })
      }
    }

    fetchCampground();

  }, [dispatch, campgroundId])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="max-w-xl mx-auto my-10">
      <img src={campground.image} alt="" />
      <p>{campground._id}</p>
    </div>
  )
}

export default Show