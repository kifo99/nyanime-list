import { useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";
import AnimeCard from "./components/Anime/AnimeCard";
import Navbar from "./components/Navigation/Navbar";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Signup from "./components/Form/Signup";
import AvatarPicker from "./components/AvatarPicker/AvatarPicker";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <Navbar
        loggedIn={loggedIn}
        hasAccount={hasAccount}
        onShowSignup={setShowSignup}
        showSignup={showSignup}
      />
      <div className={showSignup ? "blur-xs" : ""}>
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

        <div>
          <AvatarPicker name={"gambit"} />
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <Signup showSignup={showSignup} onShowSignup={setShowSignup} />
      </div>
      <AppRoutes />
    </div>
  );
}
