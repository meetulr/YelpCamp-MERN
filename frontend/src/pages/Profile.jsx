import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/user/userContext";
import CampgroundContext from "../contexts/campground/campgroundContext";
import FromLocationContext from "../contexts/fromLocation/fromLocationContext";
import OwnedCampgrounds from "../components/OwnedCampgrounds";
import { getOwnedCampgrounds } from "../contexts/user/userService";
import { deleteCampground } from "../contexts/campground/campgroundService";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";

function Profile() {
  const { user } = useContext(UserContext);
  const { dispatch: campgroundDispatch } = useContext(CampgroundContext);
  const { dispatch: locationDispatch} = useContext(FromLocationContext);

  const [ownedCampgrounds, setOwnedCampgrounds] = useState([]);
  const [loading, setLoading] = useState(false);

  const randNum = Math.floor(Math.random() * 300) + 1;

  const currUrl = window.location.pathname;

  // console.log(`from ${currUrl}`);

  useEffect(() => {
    locationDispatch({
      type: "SET_LOCATION",
      payload: currUrl
    })

    const fetchOwnedCampgrounds = async () => {
      setLoading(true);

      try {
        const data = await getOwnedCampgrounds(user._id);

        setOwnedCampgrounds(data.reverse());

        // console.log(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchOwnedCampgrounds();

    // eslint-disable-next-line
  }, [])

  const handleDelete = async (campgroundId) => {
    if (window.confirm("You sure you want to delete this Campground?")) {
      campgroundDispatch({
        type: "SET_LOADING"
      })

      try {
        const data = await deleteCampground(campgroundId);
        // console.log(data);
        toast.success("successfully deleted the campground");

        setOwnedCampgrounds(ownedCampgrounds.filter((ownedCamp) => {
          return ownedCamp._id !== campgroundId;
        }))
      } catch (error) {
        console.log(error);
        const message = error.response.data.message;
        toast.error(message);
      }

      campgroundDispatch({
        type: "STOP_LOADING"
      })
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="my-20 mx-6 flex flex-col justify-center items-center">
      <div className="bg-slate-400 rounded-full text-center">
        <div className="p-10">
          <img src={`https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randNum}.svg`} alt="pokemon" className="h-16 w-16 mx-auto" />
          <h2 className="text-xl font-bold italic my-2 mx-7">{user.username}</h2>
          <h2 className="font-bold italic text-purple-900 mx-7">{user.email}</h2>
        </div>
      </div>

      <div className="mt-5 w-full mx-auto rounded-t-xl bg-slate-500 text-center">
        {ownedCampgrounds.length ? (
          <h1 className="text-lg md:text-2xl font-bold my-3">Campgrounds Owned</h1>
        ) : (
          <h1 className="text-lg md:text-2xl font-bold my-3">No campgrounds Owned</h1>
        )}
      </div>

      {ownedCampgrounds.length ? (
        <div className="mb-5 w-full mx-auto rounded-b-xl bg-slate-400 max-h-screen overflow-scroll text-center">
          <OwnedCampgrounds
            ownedCampgrounds={ownedCampgrounds}
            handleDelete={handleDelete}
          />
        </div>
      ) : (
        <></>
      )}
    </div>

  )
}

export default Profile