import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Trash2, CircleX } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

export default function WatchlistCard({ anime, onRefetch }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const { userId, token } = useAuthStore();

  async function handelRemoveAnime() {
    try {
      await axios.delete(
        `http://localhost:8080/watchlist/delete/${userId}/${anime.animeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onRefetch();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="relative p-4 group"
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      {showDeleteBtn && (
        <CircleX
          className="absolute top-1 right-1 p-1 text-red-600 hover:text-red-500 transition-all opacity-90 hover:opacity-100 cursor-pointer"
          size={32}
          strokeWidth={2.5}
          onClick={handelRemoveAnime}
        />
      )}
      <div className=" flex-row gap-1.5 ">
        <Link to={`/anime/${anime.animeId}`}>
          <img
            src={anime.image}
            className="border border-transparent hover:border-solid hover:border-gray-600 hover:border-2 hover:rounded-lg m-auto w-24 h-36 hover:w-32 hover:h-44"
          />
        </Link>
        <h1 className="text-gray-600 font-extrabold text-xl m-auto text-center">
          {anime.title || anime.titleJapanese}
        </h1>
      </div>
    </div>
  );
}

WatchlistCard.propTypes = {
  anime: PropTypes.object,
  onRefetch: PropTypes.func,
};
