import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function Genres({ genres }) {
  return (
    <div>
      <div>
        {genres.map((genre) => (
          <Link key={genre.id}>
            <p>{genre.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

Genres.propTypes = {
  genres: PropTypes.array,
};
