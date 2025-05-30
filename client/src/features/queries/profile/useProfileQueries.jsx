import { useQuery } from "react-query";
import axios from "axios";

const fetchProfiles = async function ({ queryKey }) {
  try {
    const [_, userId] = queryKey;
    console.log(userId);

    const { data } = await axios.get(`http://localhost:8080/profile/${userId}`);

    if (!data)
      throw new Error("Something went wrong data was not fetched properly");

    return data.profile;
  } catch (error) {
    console.error(error);
  }
};

export const useProfile = (userId) =>
  useQuery({
    queryKey: ["getProfile", userId],
    queryFn: fetchProfiles,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!userId,
  });
