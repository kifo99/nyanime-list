import PropTypes from "prop-types";

export default function SeasonAnimeCard({ anime }) {
  console.log(anime);

  return (
    <li className="flex justify-center items-center">
      <div className="">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-auto rounded-lg shadow-lg"
        ></img>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{anime.title}</h1>
      </div>
    </li>
  );
}

SeasonAnimeCard.propTypes = {
  anime: PropTypes.object,
};
