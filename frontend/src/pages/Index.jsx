import { useContext, useEffect } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampgrounds } from "../contexts/campground/campgroundService"
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import Spinner from "../components/Spinner";
import IndexCampground from "../components/IndexCampground";
import IndexMapBox from "../components/IndexMapBox";


function Index() {
  const { campgrounds, loading, dispatch } = useContext(CampgroundContext);

  const { dispatch: locationDispatch } = useContext(FromLocationContext);

  const currUrl = window.location.pathname;

  console.log(`from ${currUrl}`);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      dispatch({
        type: "SET_LOADING"
      })

      try {
        const data = await getCampgrounds();

        dispatch({
          type: "GET_CAMPGROUNDS",
          payload: data.reverse()
        })

        locationDispatch({
          type: "SET_LOCATION",
          payload: currUrl
        })

        console.log(data);
      } catch (error) {
        console.log(error);
      }

      dispatch({
        type: "STOP_LOADING"
      })
    }

    fetchCampgrounds();
  }, [dispatch, locationDispatch, currUrl])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="mx-6 my-16">
      {campgrounds.length ? (
        <IndexMapBox campgrounds={campgrounds} />
      ) : (
        <></>
      )}

      <h1 className="text-3xl text-center font-bold mt-9 mb-0">All Campgrounds</h1>

      <div className="flex flex-wrap space-y-7 md:space-y-10 mx-auto justify-around">
        {campgrounds.map((campground) => (
          <IndexCampground key={campground._id} campground={campground} />
        ))}
      </div>
    </div>
  )
}

export default Index