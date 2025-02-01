import PropTypes from "prop-types";

export default function Anime({ anime }) {
  return (
    <li>
      <h1>{anime.title}</h1>
      <p>{anime.synopsis}</p>
    </li>
  );
}

Anime.propTypes = {
  anime: PropTypes.object,
};
