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

      {/* <div className="flex justify-center items-center m-auto w-[60%]"> */}
      <ul className="flex justify-center items-center m-auto w-[60%]">
        <li>
          {animeList.map((anime) => (
            <AnimeCard anime={anime} imgClassName="w-28 h-40" key={anime.id}>
              <div className="flex justify-center items center">
                <p className="m-4 text-gray-600">
                  <span className="text-rose-600 font-bold w-">Type:</span>{" "}
                  {anime.type}
                </p>
                <p className="m-4 text-gray-600 ">
                  <span className="text-rose-600 font-bold">Aired: </span>{" "}
                  {anime.aired}
                </p>
                <p className="m-4 text-gray-600">
                  <span className="text-rose-600 font-bold">Episodes:</span>{" "}
                  {anime.episodes}
                </p>
              </div>
            </AnimeCard>
          ))}
        </li>
      </ul>
      {/* </div> */}
    </div>
  );
}
