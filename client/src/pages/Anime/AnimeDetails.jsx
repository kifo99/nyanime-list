import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuthStore from "../../features/auth/useAuthStore.js";

import CustomList from "../../components/CustomList/CustomList.jsx";
import ShowLists from "../../components/CustomList/ShowLists.jsx";
import { useAllCustomLists } from "../../features/queries/activity/watchlist/useWatchlistQueries.jsx";

export default function AnimeDetails({ inWatchlist = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [showLists, setShowLists] = useState(false);

  const { token, isAuth, userId } = useAuthStore();

  const {
    data: customLists,
    isCustomListsLoading,
    refetch,
  } = useAllCustomLists(userId, {
    enabled: !!userId,
  });

  async function handleAddToWatchlist() {
    try {
      if (!id) throw new Error("Id is not valid!");
      if (!userId) throw new Error("User id is not valid!");

      if (!isAuth) throw new Error("Not authenticated!");
      await axios.post(
        `http://localhost:8080/watchlist/add/${userId}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchAnime() {
      try {
        if (!id) throw new Error("Id not valid");
        const { data } = await axios.get(
          `http://localhost:8080/anime/select/${id}`
        );

        if (!data) throw new Error("No data fetched");

        setAnime(data.anime);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <p>Loading anime details...</p>;
  }

  if (isCustomListsLoading) {
    console.log(isCustomListsLoading);

    return <div>Loading..</div>;
  }
  return (
    <>
      {!anime ? (
        <div>
          <p>Anime loading...</p>
        </div>
      ) : (
        <div className="flex-col list-none p-4 ">
          <div className="flex flex-wrap items-start justify-between p-4 ">
            <div className="w-full md:w-1/3 lg:w-1/4 p-4">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <hr className="border-t border-gray-700 my-4" />

            <div className="w-full md:w-2/3 lg:w-3/4 p-4">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {anime.title}
                </h1>
                <h2 className="text-xl text-gray-600">{anime.titleJapanese}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mt-4">
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Rank: </span>{" "}
                  {anime.rank}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Score: </span>
                  {anime.score}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Rating: </span>
                  {anime.rating}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">
                    Popularity:{" "}
                  </span>
                  {anime.popularity}
                </p>
              </div>

              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Type: </span>
                  {anime.type}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Status: </span>
                  {anime.status}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Source: </span>
                  {anime.source}
                </p>
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">
                    Duration:{" "}
                  </span>
                  {anime.duration}
                </p>
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">
                    Episodes:{" "}
                  </span>
                  {anime.episodes}
                </p>
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <p className="font-medium text-gray-700">
                  <span className="font-semibold text-rose-600">Aired: </span>
                  {anime.aired}
                </p>
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <span className="font-semibold text-rose-600">Producers: </span>
                {anime.producers.map((producer) => (
                  <p className="font-medium text-gray-700" key={producer.name}>
                    {producer.name}
                  </p>
                ))}
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <span className="font-semibold text-rose-600">Studios: </span>

                {anime.studios.map((studio) => (
                  <p className="font-medium text-gray-700" key={studio.name}>
                    {studio.name}
                  </p>
                ))}
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4">
                <span className="font-semibold text-rose-600">Genres: </span>

                {anime.genres.map((genre) => (
                  <p className="font-medium text-gray-700" key={genre.name}>
                    {genre.name}
                  </p>
                ))}
              </div>
              <hr className="border-t border-gray-700 my-4" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4">
                <span className="font-semibold text-rose-600">
                  Demographics:{" "}
                </span>

                {anime.demographics.map((dmg) => (
                  <p className="font-medium text-gray-700" key={dmg.name}>
                    {dmg.name}
                  </p>
                ))}
              </div>
              <hr className="border-t border-gray-700 my-4" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="mt-9 mb-9 text-gray-700 font-bold text-base">
              {anime.synopsis}
            </p>
          </div>

          {isAuth && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center w-3/5">
                {!inWatchlist && (
                  <div>
                    <button
                      className="bg-amber-400 text-rose-50 font-bold rounded-xl w-40 h-10 hover:w-44 hover:h-12 hover:bg-amber-300 hover:text-rose-600"
                      onClick={handleAddToWatchlist}
                    >
                      Add to watchlist
                    </button>
                  </div>
                )}

                <div>
                  <button
                    className="bg-amber-400 text-center text-rose-50 font-bold rounded-xl w-40 h-10 hover:w-44 hover:h-12 hover:bg-amber-300 hover:text-rose-600"
                    onClick={() => navigate(`/addReview/${anime.id}`)}
                  >
                    Add Review
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <button
                    className="bg-amber-400 text-rose-50 font-bold rounded-xl w-40 h-10 hover:w-44 hover:h-12 hover:bg-amber-300 hover:text-rose-600"
                    onClick={() => setShowCustom(true)}
                  >
                    Create Custom List
                  </button>
                </div>

                {Array.isArray(customLists) && customLists.length > 0 && (
                  <div>
                    <button
                      className="bg-amber-400 text-rose-50 font-bold rounded-xl w-40 h-10 hover:w-44 hover:h-12 hover:bg-amber-300 hover:text-rose-600"
                      onClick={() => setShowLists(true)}
                    >
                      Add to list
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isAuth && showCustom && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
              <CustomList
                onSetShowCustom={setShowCustom}
                onRefetchCustomList={refetch}
              />
            </div>
          )}

          {isAuth && showLists && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
              <ShowLists onSetShowLists={setShowLists} animeId={anime.id} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

AnimeDetails.propTypes = {
  inWatchlist: PropTypes.bool,
};

/*
<li 
id: anime.mal_id,
      image: anime.images.jpg.image_url,
      title: anime.title,
      titleJapanese: anime.title_japanese,
      type: anime.type,
      source: anime.source,
      status: anime.status,
      aired: anime.aired.string,
      duration: anime.duration,
      episodes: anime.episodes,
      rating: anime.rating,
      score: anime.score,
      rank: anime.rank,
      popularity: anime.popularity,
      synopsis: anime.synopsis,
      background: anime.background,
      producers: anime.producers.map((producer) => ({
        name: producer.name,
      })),
      studios: anime.studios.map((studio) => ({
        name: studio.name,
      })),
      genres: anime.genres.map((genre) => ({
        name: genre.name,
      })),
      demographics: anime.demographics.map((demographic) => ({
        name: demographic.name,

        */
