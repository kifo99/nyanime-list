import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import SearchIcon from "../../assets/icons/search/search.svg";

export default function Search({ onSetAnimeList }) {
  const [animeName, setAnimeName] = useState("");
  const [searchRes, setSearchRes] = useState("");

  const inputEl = useRef(null);

  function handleSearchAnime(e) {
    setSearchRes(e.target.value);
  }

  function handleSubmitAnime(e) {
    e.preventDefault();
    setAnimeName(searchRes);
    setSearchRes("");
  }

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, []);

  useEffect(
    function () {
      const source = axios.CancelToken.source();
      async function fetchAnime() {
        try {
          if (!animeName.length < 1) {
            const { data } = await axios.get(
              `http://localhost:8080/anime/search/anime/${animeName}`,
              {
                cancelToken: source.token,
              }
            );

            if (!data) throw new Error("No data fetched");
            onSetAnimeList(data.anime);
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchAnime();

      return () => {
        source.cancel("Component is unmounted, request canceled.");
      };
    },
    [animeName, onSetAnimeList]
  );

  return (
    <form
      onSubmit={(e) => handleSubmitAnime(e)}
      className="flex  p-2 justify-content items-center w-full"
    >
      <input
        ref={inputEl}
        type="text"
        placeholder="Search..."
        className="flex justify-content items-center w-full h-14 font-semibold px-4 text-xl rounded-full focus:outline-none bg-amber-300 text-amber-50 placeholder-amber-100 leading-none"
        value={searchRes}
        onChange={(e) => handleSearchAnime(e)}
      />

      <button className="ml-2 h-10 w-10 bg-amber-300 p-2 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all items-center">
        <img width={24} height={24} src={SearchIcon} alt="svg search icon" />
      </button>
    </form>
  );
}

Search.propTypes = {
  onSetAnimeList: PropTypes.func,
};
