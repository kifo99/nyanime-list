import PropTypes from "prop-types";

export default function Navbar({ logedIn, hasAccount }) {
  return (
    <nav className="flex-nowrap relative flex h-14 w-full items-center justify-between bg-amber-300 py-2 shadow-dark-mild dark:bg-amber-800 lg:flex-wrap lg:justify-start lg:py-4 ">
      <div className="flex w-full justify-between items-center px-3 ">
        <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <a
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              href="#"
            >
              Home
            </a>
          </li>
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <a
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              href="#"
            >
              My watch list
            </a>
          </li>
          <li className="mb-4 lg:mb-0 lg:pe-2">
            <a
              className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 hover:ease-in-out focus:text-amber-950 active:text-amber-950 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
              href="#"
            >
              My review
            </a>
          </li>
        </ul>

        <div className="flex items-center justify-center ">
          {!hasAccount ? (
            <button className="text-amber-700 font-bold hover:text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all ">
              Signin
            </button>
          ) : logedIn ? (
            <button className="text-amber-700 font-bold hover:text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all ">
              Logout
            </button>
          ) : (
            <button className="text-amber-700 font-bold hover:text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all ">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logedIn: PropTypes.bool,
  hasAccount: PropTypes.bool,
};
