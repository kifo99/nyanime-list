import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function Search({ onSetAnimeList }) {
  const [animeName, setAnimeName] = useState("");
  const [searchRes, setSearchRes] = useState("");

  function handleSearchAnime(e) {
    setSearchRes(e.target.value);
  }

  function handleSubmitAnime(e) {
    e.preventDefault();
    setAnimeName(searchRes);
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
    <div className="search-bar">
      <div className="search-btn">
        <button className="btn-primary" onClick={(e) => handleSubmitAnime(e)}>
          Search
        </button>
      </div>
      <div className="search-form">
        <form>
          <input value={searchRes} onChange={(e) => handleSearchAnime(e)} />
        </form>
      </div>
    </div>
  );
}

Search.propTypes = {
  onSetAnimeList: PropTypes.func,
};
