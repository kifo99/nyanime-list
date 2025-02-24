import { useEffect, useRef, useState } from "react";
import axios from "axios";

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
  const [hasAccount, setHasAccount] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const navRef = useRef(null);

  useEffect(function () {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) return;
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setIsAuth(true);
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMilliseconds);
  }, []);

  const setAutoLogout = (milliseconds) => {
    setTimeout(logoutHandler, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  async function handleLogin(values, { resetForm }) {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/admin/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.token);
      setIsAuth(true);
      setToken(data.token);
      setUserId(data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setShowLoginForm(false);
      setAutoLogout(remainingMilliseconds);
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  }
  return (
    <div>
      <Navbar
        isAuth={isAuth}
        hasAccount={hasAccount}
        onShowSignupForm={setShowSignupForm}
        onShowLoginForm={setShowLoginForm}
        onLogout={logoutHandler}
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
          onLogin={handleLogin}
          navRef={navRef}
        />
      </div>
      <AppRoutes />
    </div>
  );
}
