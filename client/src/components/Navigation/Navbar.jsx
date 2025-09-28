import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { protocol, host } from "../../config/env.js";
import InitialAvatar from "../Avatar/InitialAvatar";

import useAuthStore from "../../features/auth/useAuthStore.js";

export default function Navbar() {
  const { isAuth, userId, logout } = useAuthStore();

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      const { data } = await axios.get(
        `${protocol}:${host}/user/profile/${userId}`
      );
      const { user } = data;

      setAvatar(user.avatar);
    }

    fetchUser();
  }, [userId]);

  return (
    <nav className="flex-nowrap relative flex w-full items-center justify-between bg-amber-300 py-2 shadow-dark-mild dark:bg-amber-800 px-3 ">
      <ul className="flex gap-4 items-center">
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
              to="/list/default"
            >
              My Watchlist
            </Link>
          </li>
        )}
        {isAuth && (
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <Link
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              to={`/user/${userId}/profile`}
            >
              My Profile
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        {isAuth ? (
          <div className="flex items-center gap-3">
            <InitialAvatar userId={userId} />
            <button
              className="text-amber-700 font-bold m-2 hover:text-amber-950 outline-none focus:outline-none transition-all "
              onClick={logout}
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
    </nav>
  );
}
