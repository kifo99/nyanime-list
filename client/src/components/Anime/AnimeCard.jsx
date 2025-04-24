import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AnimeCard({ anime, imgClassName = "", children }) {
  return (
    <Link className="" to={`/anime/${anime.id}`}>
      <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col items-center w-1/3">
          <img
            src={anime.image}
            alt={anime.title}
            className={`rounded-lg ${imgClassName}`}
          />
          <h1 className="mt-2 text-center text-base font-semibold">
            {anime.title}
          </h1>
        </div>

        <div className="flex justify-between">{children}</div>
      </div>
    </Link>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.object,
  imgClassName: PropTypes.string,
  children: PropTypes.node,
};

{
  /* <div className="w-full md:w-1/3 lg:w-1/4 p-4">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {anime.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Rank: </span>{" "}
            {anime.rank}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Score: </span>
            {anime.score}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Rating: </span>
            {anime.rating}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Popularity: </span>
            {anime.popularity}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Duration: </span>
            {anime.duration}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Episodes: </span>
            {anime.episodes}
          </p>
        </div>
        <div className="flex-row  mt-4">
          <h2 className="font-bold text-rose-600">Description:</h2>
          <p className="font-medium text-gray-700">
            {anime.synopsis || "No description"}
          </p>
        </div>
      </div> */
}
