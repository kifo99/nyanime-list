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

  return (
    <div className="flex justify-center items-center">
      <ul className="flex flex-row justify-between overflow-x-auto scroll-smooth scrollbar-hide">
        {anime.map((anime) => (
          <SeasonAnimeCard anime={anime} key={anime.id} />
        ))}
      </ul>
    </div>
  );
}
