import { useEffect } from "react";

import WatchlistCard from "../../components/Anime/WatchlistCard";

import { useList } from "../../features/queries/activity/watchlist/useWatchlistQueries.jsx";

import useAuthStore from "../../features/auth/useAuthStore.js";
import { useParams } from "react-router-dom";

export default function Watchlist() {
  const { userId, isAuth } = useAuthStore();

  const { type, listName = "" } = useParams();

  const {
    data: list,
    listIsLoading,
    refetch,
  } = useList(userId, type, listName, {
    enabled:
      !!userId && (type === "default" || (type === "custom" && !!listName)),
  });

  useEffect(() => {
    if (!isAuth) return;
  });
  
  useEffect(() => {
    if (userId && (type === "default" || (type === "custom" && !!listName))) {
      refetch();
    }
  }, [userId, type, listName]);

  if (listIsLoading) {
    return (
      <div>
        <p>List is loading</p>
      </div>
    );
  }

  if (!list || list.length === 0) {
    return (
      <div>
        <p>No anime in your watchlist yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="m-auto text-center text-3xl font-extrabold text-rose-600">
          Watchlist
        </h1>
      </div>
      <ul className="grid justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-6">
        {list.map((anime) => (
          <li className="list-none" key={anime.animeId}>
            <WatchlistCard anime={anime} onRefetch={refetch} />
          </li>
        ))}
      </ul>
    </div>
  );
}
