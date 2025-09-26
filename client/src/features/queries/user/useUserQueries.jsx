import { useQueries, useQuery } from "react-query";
import axios from "axios";
import { protocol, host } from "../../../config/env";
const fetchUser = async function ({ queryKey }) {
  try {
    const [_, userId] = queryKey;

    const { data } = await axios.get(
      `${protocol}:${host}/user/profile/${userId}`
    );

    if (!data)
      throw new Error("Something went wrong data was not fetched properly");

    return data.user;
  } catch (error) {
    console.error(error);
  }
};

export const useUser = (userId) =>
  useQuery({
    queryKey: ["getUser", userId],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!userId,
  });

export const useUsers = (userIds = []) =>
  useQueries(
    userIds.map((id) => ({
      queryKey: ["getUsers", id],
      queryFn: fetchUser,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 1,
      enabled: !!id,
    }))
  );
