import axios from "axios";

export const getAnime = async (req, res, next) => {
  try {
    const name = req.params.name;
    console.log(name);

    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${name}`
    );

    if (!data) throw new Error("Failed to fetch data.");

    const animeList = data.data.map((anime) => ({
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
      })),
    }));

    if (!animeList.length) throw new Error("Failed to create anime list.");

    res.json({
      message: "Anime is fetched.",
      anime: animeList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
