import { useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";
import AnimeCard from "./components/Anime/AnimeCard";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  console.log(animeList);

  return (
    <div className="Container mx-auto px-4 ">
      <div className="flex justify-center">
        <div className="w-[70%]">
          <Search onSetAnimeList={setAnimeList} />
        </div>
      </div>

      <div className="Container">
        {!isSelected ? (
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
        ) : (
          <div>
            <Anime anime={anime} />
          </div>
        )}
      </div>
    </div>
  );
}
