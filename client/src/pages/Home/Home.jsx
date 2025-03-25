/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import AnimeItemCard from "../../components/Anime/AnimeItemCard";
import List from "../../components/List/List";
import Hero from "../../components/Hero/Hero";
import Genres from "../../components/Genres/Genres";
import { useQuery } from "react-query";

export default function Home() {
  const [seasonAnimeList, setSeasonAnimeList] = useState([]);
  const [recommendationAnimeList, setRecommendationAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [seasonAnimeIsLoading, setSeasonAnimeIsLoading] = useState(true);
  const [recommendationAnimeIsLoading, setRecommendationAnimeIsLoading] =
    useState(true);
  const [genresIsLoading, setGenresIsLoading] = useState(true);

  const fetchSeasonAnime = async function () {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/anime/seasonAnime`
      );

      return data.animeList;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: seasonAnime, isLoading } = useQuery({
    queryKey: ["seasonAnime"],
    queryFn: fetchSeasonAnime,
    staleTime: 1000 * 60 * 5,
  });

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchSeasonAnime = async function () {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:8080/anime/seasonAnime`,
  //         {
  //           signal: controller.signal,
  //         }
  //       );

  //       setSeasonAnimeList(data.animeList);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setSeasonAnimeIsLoading(false);
  //     }
  //   };

  //   fetchSeasonAnime();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchRecommendationAnime = async function () {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:8080/anime/animeRecommendation`,
  //         {
  //           signal: controller.signal,
  //         }
  //       );

  //       setRecommendationAnimeList(data.animeList);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setRecommendationAnimeIsLoading(false);
  //     }
  //   };

  //   fetchRecommendationAnime();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchGenres = async function () {
  //     try {
  //       const { data } = await axios.get(`http://localhost:8080/anime/genres`, {
  //         signal: controller.signal,
  //       });

  //       setGenres(data.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setGenresIsLoading(false);
  //     }
  //   };

  //   fetchGenres();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // if (seasonAnimeIsLoading) return <div>Loading...</div>;
  // if (recommendationAnimeIsLoading) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="Container mx-auto px-4 ">
      <div className="Container">
        <Hero />

        <List title={"Winter 2025 anime"} anime={seasonAnime}>
          {seasonAnime.map((anime) => (
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
