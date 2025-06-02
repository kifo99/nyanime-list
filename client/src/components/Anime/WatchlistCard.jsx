import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDeleteAnimeFromList } from "../../features/queries/activity/watchlist/useWatchlistQueries.jsx";

import { CircleX, MessageCirclePlus } from "lucide-react";
import useAuthStore from "../../features/auth/useAuthStore.js";

import Like from "../Like/Like.jsx";

export default function WatchlistCard({ anime, onRefetch, type, listName }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const { mutate: deleteAnime, isPending: isDeleting } =
    useDeleteAnimeFromList();

  const { userId, token } = useAuthStore();

  const navigate = useNavigate();

  async function handelRemoveAnime() {
    deleteAnime({
      userId,
      animeId: anime.animeId,
      type,
      listName,
    });

    onRefetch();
  }

  if (isDeleting) {
    return (
      <div>
        <p>List is deleting</p>
      </div>
    );
  }

  return (
    <div className="relative p-4 group">
      <div className="flex flex-col gap-1.5">
        <div
          className="relative w-fit m-auto"
          onMouseEnter={() => setShowDeleteBtn(true)}
          onMouseLeave={() => setShowDeleteBtn(false)}
        >
          <img
            src={anime.image}
            className={`border border-transparent transition-all duration-300 
          ${
            showDeleteBtn
              ? "border-gray-600 border-2 rounded-lg w-32 h-44"
              : "w-24 h-36"
          }`}
          />
          {showDeleteBtn && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 flex justify-around items-center py-1">
              <MessageCirclePlus
                size={24}
                stroke="#4287f5"
                className="hover:stroke-blue-800 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/addReview/${anime.animeId}`);
                }}
              />
              <Like userId={userId} animeId={anime.animeId} />
              <CircleX
                size={24}
                stroke="#ff6d05"
                className="hover:stroke-orange-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handelRemoveAnime();
                }}
              />
            </div>
          )}
        </div>
        <h1 className="text-gray-600 font-extrabold text-xl text-center">
          {anime.title || anime.titleJapanese}
        </h1>
      </div>
    </div>
  );
}

WatchlistCard.propTypes = {
  anime: PropTypes.object,
  onRefetch: PropTypes.func,
  type: PropTypes.string,
  listName: PropTypes.string,
};
