/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";

const like = async function ({ queryKey }) {
  try {
    const [_, userId, animeId] = queryKey;

    if (!userId || animeId)
      throw new Error("userId is wrong or doesn't exist!");

    await axios.post(
      `http://localhost:8080/activity/like/${userId}/${animeId}`
    );
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

export const useLike = (userId, animeId) =>
  useQuery({
    queryKey: ["like", userId, animeId],
    queryFn: like,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 5,
    retry: 1,
    enabled: !!userId && !!animeId,
  });
