import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampgrounds } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import IndexCampground from "../components/IndexCampground";


function Index() {
  const { campgrounds, loading, dispatch } = useContext(CampgroundContext);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      dispatch({
        type: "SET_LOADING"
      })

      try {
        const data = await getCampgrounds();

        dispatch({
          type: "GET_CAMPGROUNDS",
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

    fetchCampgrounds();
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="mx-6">
      <h1 className="text-3xl font-bold my-5">All Campgrounds</h1>

      <div className="flex flex-wrap space-y-5 md:space-y-10 mx-auto justify-around">
        {campgrounds.map((campground) => (
          <IndexCampground key={campground._id} campground={campground} />
        ))}
      </div>
    </div>
  )
}

export default Index