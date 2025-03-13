import { useState } from "react";
import AnimeCard from "../../components/Anime/AnimeCard";
import SeasonAnime from "../../components/Anime/SeasonAnime";
import Search from "../../components/Search/Search";

export default function Home() {
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
        <SeasonAnime />
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
