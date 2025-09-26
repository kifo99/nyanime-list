/* eslint-disable no-unused-vars */

import { useQuery } from "react-query";
import axios from "axios";
import { protocol, host } from "../../../config/env";
const fetchSeasonAnime = async function () {
  try {
    const { data } = await axios.get(`${protocol}:${host}/anime/seasonAnime`);

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchRecommendationAnime = async function () {
  try {
    const { data } = await axios.get(
      `${protocol}:${host}/anime/animeRecommendation`
    );

    return data?.animeList || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchGenres = async function () {
  try {
    const { data } = await axios.get(`${protocol}:${host}/anime/genres`);

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
      `${protocol}:${host}/anime/getAnime/${animeId}`
    );

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
