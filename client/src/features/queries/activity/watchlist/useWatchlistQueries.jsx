import { useQuery } from "react-query";
import axios from "axios";

const fetchUserWatchlist = async function ({ queryKey }) {
  // eslint-disable-next-line no-unused-vars
  const [_, userId, token] = queryKey;

  if (!userId || !token) throw new Error("userId is wrong or doesn't exist!");

  try {
    // const { data } = await axios.get(
    //   `http://localhost:8080/watchlist/get/${userId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return data.watchlist || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

const fetchList = async function ({ queryKey }) {
  try {
    // eslint-disable-next-line no-unused-vars
    const [_, userId, type, listName] = queryKey;

    if (!userId) throw new Error("userId is wrong or doesn't exist!");

    const baseURL = `http://localhost:8080/watchlist/user/${userId}/list/${type}`;

    const URL =
      type === "custom" && listName
        ? `${baseURL}/${encodeURIComponent(listName)}`
        : baseURL;

    console.log(URL);

    const { data } = await axios.get(URL);

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
    queryKey: ["userList", userId, token],
    queryFn: fetchUserWatchlist,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled: !!userId && !!token,
  });

export const useList = (userId, type = "default", listName = "") =>
  useQuery({
    queryKey: ["userWatchlist", userId, type, listName],
    queryFn: fetchList,
    staleTime: 1000 * 10 * 5,
    cacheTime: 1000 * 10 * 10,
    retry: 1,
    enabled:
      !!userId && (type === "default" || (type === "custom" && !!listName)),
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
