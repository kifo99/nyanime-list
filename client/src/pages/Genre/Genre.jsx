import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

import AnimeCard from "../../components/Anime/AnimeCard";

export default function Genre() {
  const id = useParams();
  const fetchAnime = async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/anime/searchByGenre/${id.id}`
      );

      return data.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data: animeList, isLoading } = useQuery({
    queryKey: "animeList",
    queryFn: fetchAnime,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  console.log(animeList);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="Container">
      <ul>
        {animeList && animeList.length > 0 ? (
          animeList.map((anime) => <AnimeCard anime={anime} key={anime.id} />)
        ) : (
          <div>Loading anime...</div>
        )}
      </ul>
    </div>
  );
}
