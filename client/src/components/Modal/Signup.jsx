// import AddIcon from "../../assets/icons/add/add.svg";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Signup({ showSignup }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupRef = useRef();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.get(`http://localhost:8080/admin/signup`, formData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(
    function () {
      if (showSignup && signupRef.current) {
        signupRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    [showSignup]
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        ref={signupRef}
        className={`scroll-smooth bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 ${
          showSignup ? "" : "hidden"
        }`}
      >
        <h1 className="text-amber-300 font-bold mb-4 text-center text-3xl p-7 ">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center items-center space-y-4 "
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            placeholder=" Name"
            className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            placeholder=" Email"
            className=" m-3  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            placeholder=" Password"
            className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
          />
          <button className="flex items-center  text-amber-950 font-bold justify-center mb-11 h-9 w-36 bg-amber-200 p-2 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all  ">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

Signup.propTypes = {
  showSignup: PropTypes.bool,
};
