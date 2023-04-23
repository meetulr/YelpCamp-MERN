import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UserContext from "../contexts/user/userContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const { username, email, password } = formData;

  const { loading, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please include all fields");
      return;
    }

    const userData = {
      username,
      email,
      password
    }

    dispatch({
      type: "SET_LOADING"
    });

    try {
      const res = await axios.post("/api/users/register", userData);

      dispatch({
        type: "SET_USER",
        payload: res.data
      });

      console.log(res.data);
      toast.success("Successfully registered");
      navigate("/campgrounds");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

    dispatch({
      type: "STOP_LOADING"
    })
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
    return <Spinner />;
  }

  return (
    <div className="mt-24 mb-10">

      <form className="p-6 max-w-sm md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >

        <h1 className="block mb-7 font-bold text-center text-3xl text-gray-500">Create an account</h1>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" htmlfor="username">Username</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" htmlfor="email">Email</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" htmlfor="password">Password</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" type="submit">Submit</button>
        </div>
      </form >
    </div >
  )
}

export default Register