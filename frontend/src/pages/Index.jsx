import { useContext, useEffect, useState } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampgrounds } from "../contexts/campground/campgroundService"
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import Spinner from "../components/Spinner";
import IndexCampground from "../components/IndexCampground";
import IndexMapBox from "../components/IndexMapBox";
import Pagination from "../components/Pagination";


function Index() {
  const { campgrounds, loading, dispatch } = useContext(CampgroundContext);

  const { dispatch: locationDispatch } = useContext(FromLocationContext);

  const [currPage, setCurrPage] = useState(1);
  const [campsPerPage] = useState(20);
  const [totalCamps, setTotalCamps] = useState(0);

  const endingIdx = currPage * campsPerPage;
  const startingIdx = endingIdx - campsPerPage;
  const currCamps = campgrounds.slice(startingIdx, endingIdx);

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

        setTotalCamps(data.length);

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

  const paginate = async (number) => {
    setCurrPage(number);
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="mx-6 my-16">
      {/* {campgrounds.length ? (
        <IndexMapBox campgrounds={campgrounds} />
      ) : (
        <></>
      )} */}

      <h1 className="text-3xl text-center font-bold mt-9 mb-0">All Campgrounds</h1>

      {currCamps.length && (
        <div className="flex flex-wrap space-y-7 md:space-y-10 mx-auto justify-around">
          {currCamps.map((campground) => (
            <IndexCampground key={campground._id} campground={campground} />
          ))}
        </div>
      )}

      <Pagination
        totalCamps={totalCamps}
        currPage={currPage}
        campsPerPage={campsPerPage}
        paginate={paginate}
      />
    </div>
  )
}

export default Index