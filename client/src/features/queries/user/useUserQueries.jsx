import { useQuery } from "react-query";
import axios from "axios";

const fetchUser = async function ({ queryKey }) {
  try {
    const [_, userId] = queryKey;

    const { data } = await axios.get(
      `http://localhost:8080/user/profile/${userId}`
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
    queryKey: ["getUSer", userId],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!userId,
  });
