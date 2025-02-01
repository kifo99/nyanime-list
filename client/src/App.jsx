import { useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  console.log(animeList);

  return (
    <div>
      <Search onSetAnimeList={setAnimeList} />

      <div>
        <ul>
          {animeList.map((anime) => (
            <Anime anime={anime} key={anime.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
