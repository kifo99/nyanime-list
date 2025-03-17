import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AnimeItemCard({ anime }) {
  return (
    <Link className="min-w-[400px] m-3" to={`anime/${anime.id}`}>
      <div className="flex justify-center items-center">
        <img
          src={anime.image}
          alt={anime.title}
          className="rounded-lg shadow-lg min-w-[180] min-h-[250] m-auto"
        />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-800 m-auto">
          {anime.title}
        </h1>
      </div>
    </Link>
  );
}

AnimeItemCard.propTypes = {
  anime: PropTypes.object,
};
