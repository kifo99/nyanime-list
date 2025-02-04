import { useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";
import AnimeCard from "./components/Anime/AnimeCard";
import Navbar from "./components/Navigation/Navbar";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Signup from "./components/Modal/Signup";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  console.log(animeList);

  return (
    <>
      <Navbar logedIn={logedIn} hasAccount={hasAccount} />
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
      <div className="flex justify-center items-center mt-5">
        <Signup />
      </div>
      <AppRoutes />
    </>
  );
}
