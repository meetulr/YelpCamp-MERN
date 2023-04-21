import { useContext, useEffect, useState } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampground, deleteCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Show() {
  const [formData, setFormData] = useState({
    rating: 3,
    review: ""
  });

  const { rating, review } = formData;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review) {
      toast.error("can't submit an empty review");
      return;
    }

    const newReview = {
      rating,
      body: review
    }

    try {
      const res = await axios.post(`/api/campgrounds/${campground._id}/reviews`, { review: newReview });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

  }

  const handleChange = (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [e.target.id]: e.target.value
      }
    ))
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col md:flex-row mt-24 mb-10 justify-beetween space-y-6">
      <div className="bg-stone-400 card w-96 md:w-1/2 shadow-xl">
        <div className="card-body p-0 rounded-lg">
          <figure><img src={campground.image} alt="Shoes" className="rounded-t-2xl" /></figure>
          <div className="card-body -my-5">
            <div className="mb-4 space-y-2">
              <h2 className="card-title">{campground.title}</h2>
              <p className="text-base text-stone-600">{campground.location}</p>
              <p className="font-semibold">{`$${campground.price}/night`}</p>
              <p>{`${campground.description}`}</p>
            </div>
            <div className="card-actions">
              <Link to={`/campgrounds/${campground._id}/edit`} className="btn btn-sm bg-cyan-600 hover:bg-cyan-700">Edit</Link>
              <button onClick={handleDelete} className="btn btn-sm bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <form className="flex flex-col mb-6 w-96 md:w-2/5 lg:w-5/12 mx-auto"
        onSubmit={handleSubmit}>
        <h2 className="block mb-2 font-bold text-gray-900 text-2xl md:-mt-3">Leave a review</h2>
        <div>
          <label className="block mb-2 font-bold text-gray-500" htmlfor="rating">Rating</label>
          <input className="range w-full h-6 bg-gray-400 rounded-full appearance-none cursor-pointer"
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            step="1"
            value={rating}
            onChange={handleChange}
          />
          <div className="flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <label className="block mb-0 font-bold text-gray-500" htmlfor="review">Review</label>
        <textarea className="w-full px-3 py-2 mt-2 mb-4 text-gray-700 bg-gray-300 rounded-md"
          id="review"
          name="review"
          rows="2"
          placeholder="Enter your review"
          value={review}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-sm bg-green-700 hover:bg-green-800">Submit Review</button>
      </form>
    </div>
  )
}

export default Show