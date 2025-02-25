import PropTypes from "prop-types";
import { forwardRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import InitialAvatar from "../Avatar/InitialAvatar";

const Navbar = forwardRef(function Navbar(
  { isAuth, onShowSignupForm, onShowLoginForm, onLogout, userId },
  ref
) {
  const [avatar, setAvatar] = useState("");

  function handleShowSignup(e) {
    e.preventDefault();

    onShowSignupForm(true);
  }
  function handleShowLogin(e) {
    e.preventDefault();

    onShowLoginForm(true);
  }

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      const { data } = await axios.get(
        `http://localhost:8080/user/profile/${userId}`
      );
      const { user } = data;

      setAvatar(user.avatar);
    }

    fetchUser();
  }, [userId]);

  return (
    <nav
      ref={ref}
      className="flex-nowrap relative flex h-14 w-full items-center justify-between bg-amber-300 py-2 shadow-dark-mild dark:bg-amber-800 lg:flex-wrap lg:justify-start lg:py-4 "
    >
      <div className="flex w-full justify-between items-center px-3 ">
        <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              to="/watchlist"
            >
              My watch list
            </Link>
          </li>
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              to="/review"
            >
              My review
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-center ">
          {isAuth ? (
            <div className="flex justify-center items-center w-40">
              <InitialAvatar avatar={avatar} />
              <button
                className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none transition-all "
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none 
              transition-all"
                onClick={(e) => handleShowSignup(e)}
              >
                Signin
              </button>

              <button
                className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none transition-all "
                onClick={(e) => handleShowLogin(e)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  hasAccount: PropTypes.bool,
  onShowSignupForm: PropTypes.func,
  onShowLoginForm: PropTypes.func,
  onLogout: PropTypes.func,
  userId: PropTypes.string,
};
