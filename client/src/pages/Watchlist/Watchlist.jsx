import { useUserWatchlist } from "../../Queries/api";

import useAuthStore from "../../store/useAuthStore";

import WatchlistCard from "../../components/Anime/WatchlistCard";
import { useEffect } from "react";

export default function Watchlist() {
  const { token, userId, isAuth } = useAuthStore();

  const {
    data: watchlist,
    watchlistIsLoading,
    refetch,
  } = useUserWatchlist(userId, token, {
    enabled: !!userId && token,
  });

  useEffect(() => {
    if (!isAuth) return;
  });

  if (watchlistIsLoading) {
    return (
      <div>
        <p>Watchlist is loading</p>
      </div>
    );
  }

  if (!watchlist || watchlist.length === 0) {
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
        {watchlist.map((anime) => (
          <li className="list-none" key={anime.animeId}>
            <WatchlistCard anime={anime} onRefetch={refetch} />
          </li>
        ))}
      </ul>
    </div>
  );
}
