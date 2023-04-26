import { useContext, useEffect, useState } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { getCampground, deleteCampground } from "../contexts/campground/campgroundService";
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ShowCampground from "../components/ShowCampground";
import ShowReviewForm from "../components/ShowReviewForm";
import ShowReviews from "../components/ShowReviews";
import ShowMapBox from "../components/ShowMapBox";

function Show() {
  const [formData, setFormData] = useState({
    rating: 3,
    body: ""
  });

  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState({});
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState({});

  const { rating, body } = formData;

  const { campground, loading, dispatch } = useContext(CampgroundContext);
  const { dispatch: locationDispatch } = useContext(FromLocationContext);

  const currUrl = window.location.pathname;

  console.log(`from ${currUrl}`);

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

        if (!data) {
          toast.error("can't find that campground");
          navigate("/campgrounds");
          return;
        }

        dispatch({
          type: "GET_CAMPGROUND",
          payload: data
        })

        locationDispatch({
          type: "SET_LOCATION",
          payload: currUrl
        })

        setAuthor(data.author);
        setReviews(data.reviews.slice().reverse());
        setImages(data.images);
        setCoordinates(data.geometry.coordinates);
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("can't find that campground");
        navigate("/campgrounds");
      }

      dispatch({
        type: "STOP_LOADING"
      })
    }

    fetchCampground();

    // eslint-disable-next-line
  }, [dispatch, locationDispatch, campgroundId, currUrl])

  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("You sure you want to delete this Campground?")) {
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
  }

  const handleReviewSubmit = async () => {
    if (!body) {
      toast.error("can't submit an empty review");
      return;
    }

    if (body.length > 150) {
      toast.error("review must be less than 150 characters");
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
        [res.data.newReview, ...reviews]
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
    if (window.confirm("Delete this review?")) {
      try {
        const res = await axios.delete(`/api/campgrounds/${campground._id}/reviews/${reviewId}`);
        console.log(res.data);
        toast.success("successfully deleted the review");

        setReviews(reviews.filter((reviewItem) => {
          return reviewItem._id !== reviewId;
        }))
      } catch (error) {
        console.log(error);
        toast.error("Not Authorized");
      }
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
    <div className="flex flex-col">
      <div className="md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col md:flex-row mt-24 mb-10 justify-beetween space-y-6">
        <ShowCampground
          campground={campground}
          images={images}
          author={author}
          handleDelete={handleDelete} />

        <div className="flex flex-col mb-6 w-96 md:w-2/5 lg:w-5/12 mx-auto">
          {coordinates.length ? (
            <ShowMapBox coordinates={coordinates} />
          ) : (
            <></>
          )}

          <ShowReviewForm
            rating={rating}
            body={body}
            handleChange={handleChange}
            handleReviewSubmit={handleReviewSubmit}
          />

        </div>
      </div>

      <ShowReviews
        reviews={reviews}
        handleReviewDelete={handleReviewDelete}
      />
    </div>
  )
}

export default Show