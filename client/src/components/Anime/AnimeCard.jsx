import PropTypes from "prop-types";
import axios from "axios";

export default function AnimeCard({ anime, onGetAnime, onSelect }) {
  async function handleShowMore(e, animeId) {
    e.preventDefault();
    try {
      if (!animeId) throw new Error("Id not valid");
      const data = await axios.get(
        `http://localhost:8080/anime/select/${animeId}`
      );

      if (!data) throw new Error("No data fetched");

      console.log(data.data.anime);

      onGetAnime(data.data.anime);
      onSelect(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="flex flex-wrap items-start justify-between p-4 border-b border-gray-300">
      <div className="w-full md:w-1/3 lg:w-1/4 p-4">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {anime.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
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
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Popularity: </span>
            {anime.popularity}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Duration: </span>
            {anime.duration}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Episodes: </span>
            {anime.episodes}
          </p>
        </div>

        <div
          className="flex justify-center items-center mt-20"
          onClick={(e) => handleShowMore(e, anime.id)}
        >
          <button className="w-48 bg-amber-300 p-2 rounded-full text-amber-50 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-bg-amber-300 transition-all ">
            Show more...
          </button>
        </div>
      </div>
    </li>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.object,
  animeId: PropTypes.number,
  onGetAnime: PropTypes.func,
  onSelect: PropTypes.func,
};
