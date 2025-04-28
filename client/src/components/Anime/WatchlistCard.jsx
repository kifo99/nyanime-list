import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Trash2, CircleX } from "lucide-react";

export default function WatchlistCard({ anime }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  return (
    <Link
      className="relative block m-1 border border-transparent hover:border-solid hover:border-gray-600 hover:border-2 hover:rounded-lg overflow-visible"
      to={`/anime/${anime.animeId}`}
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      {showDeleteBtn && (
        <CircleX
          className="absolute top-0 right-0  rounded-full p-1 text-red-600 hover:text-red-500 hover:w-11 hover:h-11"
          size={40}
          strokeWidth={2.5}
        />
      )}
      <div className=" flex-row gap-1.5 ">
        <img src={anime.image} className="m-auto w-24 h-36" />
        <h1 className="text-gray-600 font-extrabold text-xl m-auto text-center">
          {anime.title || anime.titleJapanese}
        </h1>
      </div>
    </Link>
  );
}

WatchlistCard.propTypes = {
  anime: PropTypes.object,
};
