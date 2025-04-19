import { useQuery } from "react-query";
import axios from "axios";

const fetchSeasonAnime = async function () {
  try {
    const { data } = await axios.get(`http://localhost:8080/anime/seasonAnime`);

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchRecommendationAnime = async function () {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/anime/animeRecommendation`
    );

    return data?.animeList || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchGenres = async function () {
  try {
    const { data } = await axios.get(`http://localhost:8080/anime/genres`);

    return data?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchAnimeById = async function ({ queryKey }) {
  try {
    const [_, watchlist] = queryKey;

    if (!watchlist) throw new Error("Watchlist is wrong or doesn't exist!");

    const animeList = await Promise.all(
      watchlist.map(async (id) => {
        const { data } = await axios.get(
          `http://localhost:8080/anime/getAnime/${id}`
        );
        return data;
      })
    );

    return animeList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchUserWatchlist = async function ({ queryKey }) {
  const [_, userId] = queryKey;

  if (!userId) throw new Error("userId is wrong or doesn't exist!");

  const { data } = await axios.get(
    `http://localhost:8080/watchlist/get/${userId}`
  );

  return data.watchlist || [];
};

export const useSeasonAnime = () =>
  useQuery({
    queryKey: "seasonAnime",
    queryFn: fetchSeasonAnime,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });

export const useRecommendationAnime = () =>
  useQuery({
    queryKey: "recommendationAnime",
    queryFn: fetchRecommendationAnime,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });

export const useGenres = () =>
  useQuery({
    queryKey: "genres",
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });

export const useAnimeById = (watchlist) =>
  useQuery({
    queryKey: ["animeById", watchlist],
    queryFn: fetchAnimeById,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled: !!watchlist,
  });

export const useUserWatchlist = (userId) =>
  useQuery({
    queryKey: ["userWatchlist", userId],
    queryFn: fetchUserWatchlist,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled: !!userId,
  });
