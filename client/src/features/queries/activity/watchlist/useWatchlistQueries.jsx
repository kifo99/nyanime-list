import { useQuery } from "react-query";
import axios from "axios";

const fetchUserWatchlist = async function ({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_, userId, token] = queryKey;

  if (!userId || !token) throw new Error("userId is wrong or doesn't exist!");

  try {
    const { data } = await axios.get(
      `http://localhost:8080/watchlist/get/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.watchlist || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

const fetchAllCustomLists = async function ({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_, userId] = queryKey;

  try {
    const { data } = await axios.get(
      `http://localhost:8080/watchlist/users/${userId}/custom-lists`
    );

    return data.lists || [];
  } catch (error) {
    console.error(error);
  }
};

export const useUserWatchlist = (userId, token) =>
  useQuery({
    queryKey: ["userWatchlist", userId, token],
    queryFn: fetchUserWatchlist,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled: !!userId && !!token,
  });

export const useAllCustomLists = (userId) =>
  useQuery({
    queryKey: ["allCustomLists", userId],
    queryFn: fetchAllCustomLists,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled: !!userId,
  });
