import PropTypes from "prop-types";

export default function Anime({ anime }) {
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
          <h2 className="text-xl text-gray-600">{anime.titleJapanese}</h2>
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
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Popularity: </span>
            {anime.popularity}
          </p>
        </div>

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Duration: </span>
            {anime.duration}
          </p>
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Episodes: </span>
            {anime.episodes}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <p className="font-medium text-gray-700">
            <span className="font-semibold text-rose-600">Aired: </span>
            {anime.aired}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          <span className="font-semibold text-rose-600">Producers: </span>
          {anime.producers.map((producer) => (
            <p className="font-medium text-gray-700" key={producer.name}>
              {producer.name}
            </p>
          ))}

          <span className="font-semibold text-rose-600">Studios: </span>

          {anime.studios.map((studio) => (
            <p className="font-medium text-gray-700" key={studio.name}>
              {studio.name}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4">
          <span className="font-semibold text-rose-600">Genres: </span>

          {anime.genres.map((genre) => (
            <p className="font-medium text-gray-700" key={genre.name}>
              {genre.name}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4">
          <span className="font-semibold text-rose-600">Demographics: </span>

          {anime.demographics.map((dmg) => (
            <p className="font-medium text-gray-700" key={dmg.name}>
              {dmg.name}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
}

Anime.propTypes = {
  anime: PropTypes.object,
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
