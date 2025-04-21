import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function WatchlistAnime({ anime }) {
  return (
    <Link
      className="flex flex-wrap items-start justify-between p-4 border-b border-gray-300"
      to={`/anime/${anime.id}`}
    >
      <div className="w-full md:w-1/3 lg:w-1/4 p-4">
        <img
          src={anime.image}
          alt={anime.name}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{anime.name}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Score: </span>
            {anime.score}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Episodes: </span>
            {anime.episodes}
          </p>
        </div>
      </div>
    </Link>
  );
}

WatchlistAnime.propTypes = {
  anime: PropTypes.object,
};
