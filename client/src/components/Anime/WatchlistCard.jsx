import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { CircleX, MessageCirclePlus } from "lucide-react";
import useAuthStore from "../../features/auth/useAuthStore.js";

export default function WatchlistCard({ anime, onRefetch }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const { userId, token } = useAuthStore();

  const navigate = useNavigate();

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
  console.log(anime);

  return (
    <div
      className="relative p-4 group"
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      <div className=" flex-row gap-1.5 ">
        <Link to={`/anime/${anime.animeId}`}>
          <img
            src={anime.image}
            className="border border-transparent hover:border-solid hover:border-gray-600 hover:border-2 hover:rounded-lg m-auto w-24 h-36 hover:w-32 hover:h-44"
            onMouseEnter={() => setShowDeleteBtn(false)}
            onMouseLeave={() => setShowDeleteBtn(true)}
          />
        </Link>
        <h1 className="text-gray-600 font-extrabold text-xl m-auto text-center">
          {anime.title || anime.titleJapanese}
        </h1>
      </div>

      {showDeleteBtn && (
        <div className="flex justify-center items-center">
          <MessageCirclePlus
            size={32}
            stroke="#4287f5"
            className="hover:stroke-blue-800"
            onClick={() => navigate(`/addReview/${anime.animeId}`)}
          />
          {/* <Heart size={32} stroke="red" className="hover:fill-red-600" /> */}
          <CircleX
            size={32}
            stroke="#ff6d05"
            className="hover:stroke-orange-700"
            onClick={handelRemoveAnime}
          />
        </div>
      )}
    </div>
  );
}

WatchlistCard.propTypes = {
  anime: PropTypes.object,
  onRefetch: PropTypes.func,
};
