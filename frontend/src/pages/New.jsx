import { useState, useContext } from "react";
import CampgroundContext from "../contexts/campground/campgroundContext";
import { useNavigate } from "react-router-dom";
import { createCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function New() {
  const { loading, dispatch } = useContext(CampgroundContext);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: undefined,
    description: "",
    image: ""
  });

  const { title, location, price, description, image } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [e.target.id]: e.target.value
      }
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !location || !price || !description || !image){
      toast.error("Please fill out all fields");
      return;
    }

    const campgroundData = {
      title,
      location,
      price,
      description,
      image
    }

    dispatch({
      type: "SET_LOADING"
    })

    try {
      const data = await createCampground(campgroundData);      
      console.log(data);
      navigate(`/campgrounds/${data._id}`);
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
    <div className="mt-24 mb-10">
      <form className="p-6 max-w-sm md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="title">Title</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="title"
            placeholder="eg. Petrified Pond"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="location">Location</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="location"
            id="location"
            placeholder="eg. Scottsdale, Arizona"
            value={location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label for="price" className="block mb-2 font-bold text-gray-700">Campground Price</label>
          <div className="relative flex items-stretch w-full">
            <span className="flex items-center justify-center w-10 h-10 text-gray-100 bg-zinc-600 rounded-l">
              $
            </span>
            <input type="number" className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-r-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
              id="price"
              placeholder="0.00"
              aria-label="price"
              value={price}
              onChange={handleChange}
 />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="description">Description</label>
          <textarea className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            id="description"
            rows="4"
            placeholder="Describe your camp in concise words"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="image">Enter Image URL</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="image"
            placeholder="https://source.unsplash.com/collection/483251"
            value={image}
            onChange={handleChange}
          />
        </div>

        {/* <div class="mb-6">
          <label for="images" className="block mb-2 font-bold text-gray-700">Choose Images</label>
          <input type="file" className="file-input file-input-md w-full  text-gray-700 bg-gray-200"
            id="images"
            multiple />
        </div> */}

        <div className="flex justify-end">
          <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" type="submit">Submit</button>
        </div>
      </form >
    </div >
  )
}

export default New