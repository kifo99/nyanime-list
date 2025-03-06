import PropTypes from "prop-types";

export default function SeasonAnimeCard({ anime }) {
  return (
    <li className="min-w-[400px] m-3">
      <div className="flex justify-center items-center">
        <img
          src={anime.image}
          alt={anime.title}
          className="rounded-lg shadow-lg min-w-[180] min-h-[250] m-auto"
        />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-800 m-auto">
          {anime.title}
        </h1>
      </div>
    </li>
  );
}

SeasonAnimeCard.propTypes = {
  anime: PropTypes.object,
};
