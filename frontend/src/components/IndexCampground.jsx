import { Link } from "react-router-dom";

function IndexCampground({ campground }) {
  const campDesc = campground.description.slice(0, 100);

  return (
    <div className="bg-stone-400 card w-96 md:w-80 lg:w-96 mt-10 shadow-xl">
      <div className="card-body p-0 rounded-lg">
        <figure><img src={campground.images[0].url} alt="image" className="rounded-t-2xl" /></figure>
        <div className="flex flex-col justify-between card-body -my-5">
          <div className="mb-4">
            <h2 className="card-title">{campground.title}</h2>
            <p className="text-base text-stone-600">{campground.location}</p>
            <p>{`${campDesc}...`}</p>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/campgrounds/${campground._id}`} className="btn">Show Campground</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default IndexCampground