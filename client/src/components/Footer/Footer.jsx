import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-amber-300 py-6 px-6 shadow-dark-mild dark:bg-amber-800 text-lg">
      <div className="text-amber-700 font-bold dark:text-white/60 text-xl mb-2">
        Made by <span className="text-amber-950 dark:text-white">Gambit</span>
      </div>

      <div>
        <Link
          to="https://www.patreon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 font-bold transition duration-200 hover:text-amber-950 dark:text-white/60 dark:hover:text-white/80 text-lg"
        >
          Support Me
        </Link>
      </div>

      <div className="text-amber-700 font-bold dark:text-white/60 text-lg mb-2">
        Thank you for your support!
      </div>
    </footer>
  );
}
