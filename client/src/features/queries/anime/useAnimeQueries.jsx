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
    const [_, animeId] = queryKey;

    const { data } = await axios.get(
      `http://localhost:8080/anime/getAnime/${animeId}`
    );

    console.log(data);

    return data?.anime || null;
  } catch (error) {
    console.error(error);
    return [];
  }
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

export const useGetAnime = (animeId) =>
  useQuery({
    queryKey: ["getAnime", animeId],
    queryFn: fetchAnimeById,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!animeId,
  });
