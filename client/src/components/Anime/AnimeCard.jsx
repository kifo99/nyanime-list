import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AnimeCard({
  anime,
  imgClassName = "",
  children = null,
}) {
  return (
    <Link className="block m-3" to={`/anime/${anime.id}`}>
      <div className="bg-violet-50 hover:bg-violet-300  rounded-lg">
        <div className="flex justify-between items-center gap-1">
          <div className="flex flex-col items-center w-1/3">
            <img
              src={anime.image}
              alt={anime.title}
              className={`rounded-lg m-2 ${imgClassName}`}
            />
            <h1 className="mb-2 text-center text-base font-bold text-gray-600">
              {anime.title || anime.titleJapanese}
            </h1>
          </div>

          <div className="flex justify-between">{children}</div>
        </div>
      </div>
    </Link>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.object,
  imgClassName: PropTypes.string,
  children: PropTypes.node,
};
