import { useContext, useEffect } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampground, deleteCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";

function Show() {
  const { campground, loading, dispatch } = useContext(CampgroundContext);

  const params = useParams();
  const { campgroundId } = params;
  const navigate = useNavigate();

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

  const handleDelete = async (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_LOADING"
    })

    try {
      const data = await deleteCampground(campgroundId);
      console.log(data);
      navigate(`/campgrounds`);
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: "STOP_LOADING"
    })

  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="bg-stone-400 card w-96 md:w-1/2 lg:w-1/2 mt-24 mb-10 mx-auto shadow-xl">
      <div className="card-body p-0 rounded-lg">
        <figure><img src={campground.image} alt="Shoes" className="rounded-t-2xl" /></figure>
        <div className="card-body -my-5">
          <div className="mb-4">
            <h2 className="card-title">{campground.title}</h2>
            <p className="text-base text-stone-600">{campground.location}</p>
            <p>{`${campground.description}`}</p>
          </div>
          <div className="card-actions md:justify-around lg:justify-end">
            <Link to={`/campgrounds/${campground._id}/edit`} className="hidden xl:flex btn hover:bg-orange-700">Edit Campground</Link>
            <button onClick={handleDelete} className="hidden xl:block btn hover:bg-red-700">Delete Campground</button>

            <div className="btn-group xl:hidden">
              <div className="btn-group">
                <button className="btn btn-sm hover:bg-orange-700">
                  <Link to={`/campgrounds/${campground._id}/edit`}>Edit Campground</Link>
                </button>
                <button onClick={handleDelete} className="btn btn-sm hover:bg-red-700">Delete Campground</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show