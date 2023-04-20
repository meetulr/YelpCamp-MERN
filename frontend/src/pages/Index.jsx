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

      const data = await getCampgrounds();

      dispatch({
        type: "GET_CAMPGROUNDS",
        payload: data
      })

      console.log(data);
    }

    fetchCampgrounds();
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="mx-6">
      <h1 className="text-3xl font-bold my-5">All Campgrounds</h1>

      <div>
        {campgrounds.map((campground) => (
          <Link to={`${campground._id}`} key={campground._id}><IndexCampground campground={campground} /></Link>
        ))}
      </div>
    </div>
  )
}

export default Index