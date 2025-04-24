import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function WatchlistCard({ anime }) {
  return (
    <Link
      className="block m-1 border border-transparent hover:border-solid hover:border-rose-600 hover:border-2 hover:rounded-lg"
      to={`/anime/${anime.animeId}`}
    >
      <div className="flex-row gap-1.5 ">
        <img src={anime.image} className="m-auto w-24 h-36" />
        <h1 className="text-gray-600 font-extrabold text-xl m-auto text-center">
          {anime.name || anime.titleJapanese}
        </h1>
      </div>
    </Link>
  );
}

WatchlistCard.propTypes = {
  anime: PropTypes.object,
};
