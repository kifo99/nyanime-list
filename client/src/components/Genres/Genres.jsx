import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function Genres({ genres }) {
  return (
    <div className="flex-row gap-3 mt-8  ">
      <div className="flex justify-center items-center p-5 mb-5 ">
        <h1 className="text-amber-400 font-bold text-5xl h-[70px]">
          Anime genres
        </h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <div
            className="px-4 py-2  rounded-lg shadow-sm hover:bg-rose-600 text-rose-600 hover:text-white font-bold transition"
            key={genre.id}
          >
            <Link to={`genre/${genre.id}`}>{genre.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Genres.propTypes = {
  genres: PropTypes.array,
};
