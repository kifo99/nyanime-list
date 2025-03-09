import { useEffect, useState, useRef } from "react";
import axios from "axios";

import SeasonAnimeCard from "./SeasonAnimeCard";

import LeftIcon from "../../assets/icons/arrows/leftarrow.svg";
import RightIcon from "../../assets/icons/arrows/rightarrow.svg";

export default function SeasonAnime() {
  const [anime, setAnime] = useState([]);
  const [showScrollBtns, setShowScrollBtns] = useState(false);
  const scrollContainer = useRef(null);
  const scrollAmount = 1200;

  const handleScrolling = (direction) => {
    if (!scrollContainer.current || anime.length === 0) return;

    const container = scrollContainer.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 0) {
        container.scrollLeft = scrollWidth - clientWidth;
      } else {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft + clientWidth >= scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/anime/seasonAnime`
        );

        setAnime(data.animeList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      onMouseEnter={() => setShowScrollBtns(true)}
      onMouseLeave={() => setShowScrollBtns(false)}
      className="flex-col justify-center items-center"
    >
      <div className="flex justify-center items-center m-4">
        <h1 className="text-3xl text-center font-bold text-gray-800">
          Winter 2025 Anime
        </h1>
      </div>
      {showScrollBtns && (
        <>
          <button
            onClick={() => handleScrolling("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400 opacity-40 p-5 text-white  rounded-full shadow-md hover:bg-amber-400 hover:opacity-100 z-10 flex items-center justify-center"
          >
            <img
              width={35}
              height={35}
              src={LeftIcon}
              alt="svg left arrow icon"
            />
          </button>

          <button
            onClick={() => handleScrolling("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2  bg-amber-400 opacity-40 p-5 text-white  rounded-full shadow-md hover:bg-amber-400 hover:opacity-100 z-10 flex items-center justify-center"
          >
            <img
              width={35}
              height={35}
              src={RightIcon}
              alt="svg right arrow icon"
            />
          </button>
        </>
      )}

      <ul
        ref={scrollContainer}
        className="flex flex-row justify-between overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {anime.map((anime) => (
          <SeasonAnimeCard anime={anime} key={anime.id} />
        ))}
      </ul>
    </div>
  );
}
