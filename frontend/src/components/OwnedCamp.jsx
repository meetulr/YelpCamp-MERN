import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

function OwnedCamp({ ownedCamp, handleDelete }) {
  const imgUrl = ownedCamp.images[0].url.replace('/upload', '/upload/w_175');
  const desc = ownedCamp.description.slice(0, 50);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campgrounds/${ownedCamp._id}`);
  }

  return (
    <div className="bg-slate-700 mx-2 md:mx-20 lg:mx-40 xl:mx-60 flex justify-between rounded-2xl">
      <figure onClick={handleClick}><img className="rounded-l-2xl" src={imgUrl} alt="Shoes" /></figure>

      <div onClick={handleClick} className="flex flex-col justify-center items-center">
        <h2 className="text-slate-300 font-semibold lg:font-bold mb-1 ml-2">{ownedCamp.title}</h2>
        <p className="hidden md:block text-slate-400 font-semibold italic mb-3">{ownedCamp.location}</p>
        <p className="hidden lg:block text-slate-300 font-extralight">{`${desc}...`}</p>
      </div>

      <div className="m-3 flex flex-col justify-between md:flex-row">
        <Link to={`/campgrounds/${ownedCamp._id}/edit`} className="btn btn-ghost -my-2"><FaEdit /></Link>
        <button onClick={() => handleDelete(ownedCamp._id)} className="btn btn-ghost -my-2"><FaTrash /></button>
      </div>
    </div>
  )
}

export default OwnedCamp