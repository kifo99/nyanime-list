/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import AnimeCard from "../../components/Anime/AnimeCard";
import AnimeItemCard from "../../components/Anime/AnimeItemCard";
import Search from "../../components/Search/Search";
import List from "../../components/List/List";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [seasonAnimeList, setSeasonAnimeList] = useState([]);
  const [recommendationAnimeList, setRecommendationAnimeList] = useState([]);
  const [anime, setAnime] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const seasonAnime = await axios.get(
          `http://localhost:8080/anime/seasonAnime`,
          {
            signal: controller.signal,
          }
        );

        const recommendationAnime = await axios.get(
          `http://localhost:8080/anime/animeRecommendation`,
          {
            signal: controller.signal,
          }
        );

        setSeasonAnimeList(seasonAnime.data.animeList);
        setRecommendationAnimeList(recommendationAnime.data.animeList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

 
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="Container mx-auto px-4 ">
      <div className="flex justify-center">
        <div className="w-[70%]">
          <Search onSetAnimeList={setAnimeList} />
        </div>
      </div>

      <div className="Container">
        <List title={"Winter 2025 anime"} anime={seasonAnimeList}>
          {seasonAnimeList.map((anime) => (
            <AnimeItemCard anime={anime} key={anime.id} />
          ))}
        </List>

        <hr className="border-t border-gray-700 my-4" />

        <List title={"Anime Recommendations"} anime={recommendationAnimeList}>
          {recommendationAnimeList.map((anime) => (
            <AnimeItemCard anime={anime} key={anime.id} />
          ))}
        </List>
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
      </div>
    </div>
  );
}
