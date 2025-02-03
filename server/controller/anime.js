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
      rank: anime.rank,
      score: anime.score,
      rating: anime.rating,
      popularity: anime.popularity,
      duration: anime.duration,
      episodes: anime.episodes,
    }));

    if (!animeList.length) throw new Error("Failed to create anime list.");

    res.json({
      message: "Anime list is fetched.",
      anime: animeList,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getAnimeWithId = async (req, res, next) => {
  try {
    const id = req.params.animeId;

    const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);

    if (!data) throw new Error("Failed to fetch data.");

    const anime = {
      id: data.data.mal_id,
      image: data.data.images.jpg.image_url,
      title: data.data.title,
      titleJapanese: data.data.title_japanese,
      type: data.data.type,
      source: data.data.source,
      status: data.data.status,
      aired: data.data.aired.string,
      duration: data.data.duration,
      episodes: data.data.episodes,
      rating: data.data.rating,
      score: data.data.score,
      rank: data.data.rank,
      popularity: data.data.popularity,
      synopsis: data.data.synopsis,
      background: data.data.background,
      producers: data.data.producers.map((producer) => ({
        name: producer.name,
      })),
      studios: data.data.studios.map((studio) => ({
        name: studio.name,
      })),
      genres: data.data.genres.map((genre) => ({
        name: genre.name,
      })),
      demographics: data.data.demographics.map((demographic) => ({
        name: demographic.name,
      })),
    };

    console.log(anime);

    if (!anime) throw new Error("Failed to create anime.");

    res.json({
      message: "Anime is fetched.",
      anime: anime,
    });
  } catch (err) {
    console.error(err);
  }
};
