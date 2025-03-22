import { useState } from "react";

import Search from "../../components/Search/Search";
import AnimeCard from "../../components/Anime/AnimeCard";

export default function Browse() {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="Container mx-auto px-4 ">
      <div className="flex justify-center">
        <div className="w-[70%]">
          <Search onSetAnimeList={setAnimeList} />
        </div>
      </div>

      <div className="Container">
        <ul>
          {animeList.map((anime) => (
            <AnimeCard
              anime={anime}
              onGetAnime={setAnime}
              onSelect={setIsSelected}
              key={anime.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
