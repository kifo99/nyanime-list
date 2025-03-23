/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import AnimeItemCard from "../../components/Anime/AnimeItemCard";
import List from "../../components/List/List";
import Hero from "../../components/Hero/Hero";
import Genres from "../../components/Genres/Genres";

export default function Home() {
  const [seasonAnimeList, setSeasonAnimeList] = useState([]);
  const [recommendationAnimeList, setRecommendationAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // const seasonAnime = await axios.get(
        //   `http://localhost:8080/anime/seasonAnime`,
        //   {
        //     signal: controller.signal,
        //   }
        // );

        // const recommendationAnime = await axios.get(
        //   `http://localhost:8080/anime/animeRecommendation`,
        //   {
        //     signal: controller.signal,
        //   }
        // );

        // const genres = await axios.get(`http://localhost:8080/anime/genres`, {
        //   signal: controller.signal,
        // });

        const [seasonAnime, recommendationAnime, genres] = await Promise.all([
          axios.get(`http://localhost:8080/anime/seasonAnime`, {
            signal: controller.signal,
          }),
          axios.get(`http://localhost:8080/anime/animeRecommendation`, {
            signal: controller.signal,
          }),
          axios.get(`http://localhost:8080/anime/genres`, {
            signal: controller.signal,
          }),
        ]);

        console.log(seasonAnime);
        console.log(recommendationAnime);
        console.log(genres);

        setSeasonAnimeList(seasonAnime.data.animeList);
        setRecommendationAnimeList(recommendationAnime.data.animeList);
        setGenres(genres.data.data);
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
      <div className="Container">
        <Hero />

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

        <Genres genres={genres} />
      </div>
    </div>
  );
}
