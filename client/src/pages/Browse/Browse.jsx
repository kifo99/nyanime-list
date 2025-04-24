import { useState } from "react";

import Search from "../../components/Search/Search";
import AnimeCard from "../../components/Anime/AnimeCard";

export default function Browse() {
  const [animeList, setAnimeList] = useState([]);

  return (
    <div className="flex-row mx-auto px-4 w-full">
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center w-[70%]">
          <div className="w-full">
            <Search onSetAnimeList={setAnimeList} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center m-auto w-[60%]">
        <ul>
          {animeList.map((anime) => (
            <AnimeCard anime={anime} imgClassName="w-16 h-20" key={anime.id}>
              <p>{anime.episodes}</p>
              <p>{anime.rank}</p>
            </AnimeCard>
          ))}
        </ul>
      </div>
    </div>
  );
}
