import AddIcon from "../../assets/icons/add/add.svg";
import PropTypes from "prop-types";

export default function Signup({ showSignup }) {
  return (
    <div
      className={`bg-gray-100 rounded-lg shadow-lg min-w-4xl shadow-amber-50 ${
        showSignup ? "" : "hidden"
      }`}
    >
      <h1 className="text-amber-300 font-bold mb-4 text-center text-3xl p-7 ">
        Sign Up
      </h1>
      <form className="flex flex-col justify-center items-center space-y-4 ">
        <input
          type="text"
          name="name"
          placeholder=" Name"
          className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <input
          type="email"
          name="email"
          placeholder=" Email"
          className=" m-3  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <input
          type="password"
          name="password"
          placeholder=" Password"
          className=" m-9  w-3/4 h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <button className="ml-2 h-18 w-36 bg-amber-200 p-2 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all items-center flex justify-between ">
          <span>Select Avatar</span>
          <img width={24} height={24} src={AddIcon} alt="svg add icon" />
        </button>
      </form>
    </div>
  );
}

Signup.propTypes = {
  showSignup: PropTypes.bool,
};
