import { useContext, useEffect, useState } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampground, deleteCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ShowCampground from "../components/ShowCampground";
import ShowReviewForm from "../components/ShowReviewForm";
import ShowReviews from "../components/ShowReviews";

function Show() {
  const [formData, setFormData] = useState({
    rating: 3,
    body: ""
  });

  const [reviews, setReviews] = useState([]);

  const { rating, body } = formData;

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

        if(!data){
          toast.error("can't find that campground");
          navigate("/campgrounds");
          return;
        }

        dispatch({
          type: "GET_CAMPGROUND",
          payload: data
        })

        setReviews(data.reviews.slice().reverse());
        console.log(data);
      } catch (error) {
        console.log(error);
        const message = error.response.data.message;
        toast.error(message);
      }

      dispatch({
        type: "STOP_LOADING"
      })
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
      toast.success("successfully deleted the campground");
      navigate(`/campgrounds`);
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    }

    dispatch({
      type: "STOP_LOADING"
    })

  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!body) {
      toast.error("can't submit an empty review");
      return;
    }

    const newReview = {
      rating,
      body
    }

    try {
      const res = await axios.post(`/api/campgrounds/${campground._id}/reviews`, { review: newReview });
      console.log(res.data);
      toast.success("made a new review");
      setReviews((prevState) => (
        [newReview, ...reviews]
      ))

      setFormData({
        rating: 3,
        body: ""
      })

    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    }

  }

  const handleReviewDelete = async (reviewId) => {
    try {
      const res = await axios.delete(`/api/campgrounds/${campground._id}/reviews/${reviewId}`);
      console.log(res.data);
      toast.success("successfully deleted the review");  
      setReviews(reviews.filter((reviewItem) => {
        return reviewItem._id != reviewId;
      }))
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
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
      <ShowCampground
        campground={campground}
        handleDelete={handleDelete} />

      <div className="flex flex-col mb-6 w-96 md:w-2/5 lg:w-5/12 mx-auto">
        <ShowReviewForm
          rating={rating}
          body={body}
          handleChange={handleChange}
          handleReviewSubmit={handleReviewSubmit}
        />

        <ShowReviews
          reviews={reviews}
          handleReviewDelete={handleReviewDelete}
        />
      </div>
    </div>
  )
}

export default Show