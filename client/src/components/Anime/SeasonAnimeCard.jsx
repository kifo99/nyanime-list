import PropTypes from "prop-types";

export default function SeasonAnimeCard({ anime }) {
  console.log("first");

  console.log(`This is the anime: ${anime}`);

  return (
    <li className="flex justify-center items-center">
      <div className="">
        <img
          src={anime.image}
          alt={anime.title}
          className="rounded-lg shadow-lg w-10 h-24"
        />
      </div>
      <div>
        <h1 className="text-xs font-semibold text-gray-800">{anime.title}</h1>
      </div>
    </li>
  );
}

SeasonAnimeCard.propTypes = {
  anime: PropTypes.object,
};
