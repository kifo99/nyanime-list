import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import SearchIcon from "../../assets/icons/search/search.svg";

export default function Search({ onSetAnimeList }) {
  const [animeName, setAnimeName] = useState("");
  const [searchRes, setSearchRes] = useState("");

  function handleSearchAnime(e) {
    setSearchRes(e.target.value);
  }

  function handleSubmitAnime(e) {
    e.preventDefault();
    setAnimeName(searchRes);
    setSearchRes("");
  }

  useEffect(
    function () {
      const source = axios.CancelToken.source();
      async function fetchAnime() {
        try {
          if (!animeName.length < 1) {
            const { data } = await axios.get(
              `http://localhost:8080/anime/search/${animeName}`,
              {
                cancelToken: source.token,
              }
            );
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
    <div className="flex  p-2 justify-content items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full py-1 px-4 rounded-full focus:outline-none bg-emerald-200 text-emerald-950"
        value={searchRes}
        onChange={(e) => handleSearchAnime(e)}
      />

      <button
        className="ml-2 bg-emerald-500 p-2 rounded-full hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        onClick={(e) => handleSubmitAnime(e)}
      >
        <img width={24} height={24} src={SearchIcon} alt="svg search icon" />
      </button>
    </div>
  );
}

Search.propTypes = {
  onSetAnimeList: PropTypes.func,
};
