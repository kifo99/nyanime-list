/* eslint-disable no-unused-vars */
import AnimeItemCard from "../../components/Anime/AnimeItemCard";
import List from "../../components/List/List";
import Hero from "../../components/Hero/Hero";
import Genres from "../../components/Genres/Genres";

import {
  useSeasonAnime,
  useRecommendationAnime,
  useGenres,
} from "../../Queries/api";

export default function Home() {
  const { data: seasonAnime, seasonAnimeIsLoading } = useSeasonAnime();
  const { data: recommendationAnime, recommendationAnimeIsLoading } =
    useRecommendationAnime();
  const { data: genres, genresIsLoading } = useGenres();

  if (seasonAnimeIsLoading || recommendationAnimeIsLoading || genresIsLoading)
    return <div>Loading...</div>;

  return (
    <div className="Container mx-auto px-4 ">
      <div className="Container">
        <Hero />

        {seasonAnime && seasonAnime.length > 0 ? (
          <List title={"Winter 2025 anime"} anime={seasonAnime}>
            {seasonAnime.map((anime) => (
              <AnimeItemCard anime={anime} key={anime.id} />
            ))}
          </List>
        ) : (
          <div>Loading anime...</div>
        )}

        <hr className="border-t border-gray-700 my-4" />

        {recommendationAnime && recommendationAnime.length > 0 ? (
          <List title={"Anime Recommendations"} anime={recommendationAnime}>
            {recommendationAnime.map((anime) => (
              <AnimeItemCard anime={anime} key={anime.id} />
            ))}
          </List>
        ) : (
          <div>Loading anime...</div>
        )}

        {genres && genres.length > 0 ? (
          <Genres genres={genres} />
        ) : (
          <div>Loading genres...</div>
        )}
      </div>
    </div>
  );
}
