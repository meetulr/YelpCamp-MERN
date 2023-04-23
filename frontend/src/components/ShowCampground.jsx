import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/user/userContext";

function ShowCampground({ campground, author, handleDelete }) {
  const { user } = useContext(UserContext);

  console.log(campground);
  return (
    <div className="bg-stone-400 card w-96 md:w-1/2 shadow-xl">
      <div className="card-body p-0 rounded-lg">
        <figure><img src={campground.image} alt="Shoes" className="rounded-t-2xl" /></figure>
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
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowCampground