import PropTypes from "prop-types";

export default function SeasonAnimeCard({ anime }) {
  return (
    <div className="flex justify-center items-center">
      <div>
        <img src={anime.image}></img>
      </div>
      <div>
        <h1>{anime.title}</h1>
      </div>
    </div>
  );
}

SeasonAnimeCard.propTypes = {
  anime: PropTypes.object,
};
