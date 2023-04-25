import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/user/userContext";
import CarouselComponent from "./CarouselComponent";

function ShowCampground({ campground, author, images, handleDelete }) {
  const { user } = useContext(UserContext);
  console.log(campground.images);

  console.log(campground);
  return (
    <div className="bg-stone-400 card w-96 md:w-1/2 shadow-xl">
      <div className="card-body p-0 rounded-lg">
        <CarouselComponent images={images} />

        <div className="flex flex-col justify-between card-body -my-5">
          <div className="mb-4 space-y-2">
            <h2 className="card-title">{campground.title}</h2>
            <p className="text-base text-stone-600">{campground.location}</p>
            <p className="font-semibold">{`$${campground.price}/night`}</p>
            <p className="text-base font-semibold text-pink-950">Submitted by {author.username}</p>
            <p>{`${campground.description}`}</p>
          </div>
          {user && user._id === author._id ? (
            <div className="card-actions">
              <Link to={`/campgrounds/${campground._id}/edit`} className="btn btn-sm bg-cyan-600 hover:bg-cyan-700">Edit</Link>
              <button onClick={handleDelete} className="btn btn-sm bg-red-600 hover:bg-red-700">Delete</button>
            </div>
          ) : (
            <a className="btn btn-sm bg-purple-800 hover:bg-purple-900" href={`mailto:${author.email}?Subject=YelpCamp: ${campground.title}`}>Contact Owner</a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowCampground