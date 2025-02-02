import { useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  console.log(animeList);

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
            <Anime anime={anime} key={anime.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
