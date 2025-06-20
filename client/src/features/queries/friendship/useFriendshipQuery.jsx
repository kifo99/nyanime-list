/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByName = async function ({ queryKey }) {
  try {
    const [_, username] = queryKey;

    const { data } = await axios.get(
      `http://localhost:8080/user/${username}/search-user`
    );

    return data.user;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const useUserByName = (username) =>
  useQuery({
    queryKey: ["userByName", username],
    queryFn: fetchUserByName,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!username,
  });
