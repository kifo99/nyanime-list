/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByName = async function ({ queryKey }) {
  const [_, username] = queryKey;

  const { data } = axios.get(`http://localhost:8080/user/search-user`, {
    username,
  });

  console.log(data);
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
