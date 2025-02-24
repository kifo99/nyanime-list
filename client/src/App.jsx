import { useRef, useState } from "react";
import Search from "./components/Search/Search";
import Anime from "./components/Anime/Anime";
import AnimeCard from "./components/Anime/AnimeCard";
import Navbar from "./components/Navigation/Navbar";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import Signup from "./components/Form/Signup";
import Login from "./components/Form/Login";
import AvatarPicker from "./components/AvatarPicker/AvatarPicker";

export default function App() {
  const [animeList, setAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const navRef = useRef(null);

  return (
    <div>
      <Navbar
        loggedIn={loggedIn}
        hasAccount={hasAccount}
        onShowSignupForm={setShowSignupForm}
        onShowLoginForm={setShowLoginForm}
        ref={navRef}
      />
      <div className={showSignupForm || showLoginForm ? "blur-xs" : ""}>
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
      <div
        className={
          showSignupForm ? "flex justify-center items-center mt-5" : "hidden"
        }
      >
        <Signup
          showSignupForm={showSignupForm}
          onShowSignupForm={setShowSignupForm}
          onSetHasAccount={setHasAccount}
          navRef={navRef}
        />
      </div>
      <div
        className={
          showLoginForm ? "flex justify-center items-center mt-5" : "hidden"
        }
      >
        <Login
          showLoginForm={showLoginForm}
          onShowLoginForm={setShowLoginForm}
          onSetLoggedIn={setLoggedIn}
          navRef={navRef}
        />
      </div>
      <AppRoutes />
    </div>
  );
}
