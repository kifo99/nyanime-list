import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import InitialAvatar from "../Avatar/InitialAvatar";

import useAuthStore from "../../store/useAuthStore";

export default function Navbar({ onLogout }) {
  const { isAuth, userId } = useAuthStore();

  const [avatar, setAvatar] = useState("");

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
    <nav className="flex-nowrap relative flex h-14 w-full items-center justify-between bg-amber-300 py-2 shadow-dark-mild dark:bg-amber-800 lg:flex-wrap lg:justify-start lg:py-4 ">
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
              to="/browse"
            >
              Browse
            </Link>
          </li>
          {isAuth && (
            <li className="mb-4 lg:mb-0 lg:pe-2">
              <Link
                className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                to="/review"
              >
                My Watchlist
              </Link>
            </li>
          )}
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
              <Link
                className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none 
              transition-all"
                to="/signup"
              >
                Signin
              </Link>

              <Link
                className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none transition-all "
                to="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLogout: PropTypes.func,
};
