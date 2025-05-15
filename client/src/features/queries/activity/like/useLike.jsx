/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";

const isLiked = async function ({ queryKey }) {
  try {
    const [_, userId, animeId] = queryKey;

    console.log(userId, animeId);

    const { data } = await axios.get(
      `http://localhost:8080/activity/isLiked/${userId}/${animeId}`
    );

    return data.isLiked;
  } catch (error) {
    console.error(error);
  }
};

export const useIsLiked = (userId, animeId) =>
  useQuery({
    queryKey: ["isLiked", userId, animeId],
    queryFn: isLiked,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 5,
    retry: 1,
    enabled: !!userId && !!animeId,
  });
