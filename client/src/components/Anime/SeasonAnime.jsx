import { useEffect, useState } from "react";
import axios from "axios";

import SeasonAnimeCard from "./SeasonAnimeCard";

export default function SeasonAnime() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/anime/seasonAnime`
        );

        setAnime(data.animeList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log("This is inside of SeasonAnime");

  return (
    <div className="flex justify-center items-center">
      <ul className="flex flex-row justify-between overflow-hidden scroll-smooth">
        {anime.map((anime) => (
          <SeasonAnimeCard anime={anime} key={anime.id} />
        ))}
      </ul>
    </div>
  );
}
