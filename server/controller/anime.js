import axios from "axios";

export const getAnime = async (req, res, next) => {
  try {
    const name = req.params.name;

    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${name}`
    );

    if (!data) throw new Error("Failed to fetch data.");

    const animeList = filterData(data).map((anime) => {
      return {
        id: anime.mal_id,
        image: anime.images.jpg.image_url,
        title: anime.title,
        titleJapanese: anime.title_japanese,
        aired: anime.aired.string,
        type: anime.type,
        rank: anime.rank,
        score: anime.score,
        rating: anime.rating,
        popularity: anime.popularity,
        duration: anime.duration,
        episodes: anime.episodes,
        background: anime.synopsis,
      };
    });

    if (!animeList.length) throw new Error("Failed to create anime list.");

    res.status(200).json({
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

    if (!anime) throw new Error("Failed to create anime.");

    res.status(200).json({
      message: "Anime is fetched.",
      anime: anime,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAvatar = async (req, res, next) => {
  try {
    const name = req.params.name;

    const { data } = await axios.get(
      `https://api.dicebear.com/9.x/initials/svg?seed=${name}`
    );

    if (!data) throw new Error("Failed to fetch data.");

    res.status(200).json({
      message: "Avatar fetched",
      svg: data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getSeasonAnime = async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const getSeason = function () {
      const month = new Date().getMonth() + 1;

      if (month >= 3 && month <= 5) return "spring";
      if (month >= 6 && month <= 8) return "summer";
      if (month >= 9 && month <= 11) return "fall";
      return "winter";
    };

    const { data } = await axios.get(
      `https://api.jikan.moe/v4/seasons/${year}/${getSeason()}`
    );

    if (!data) throw new Error("Failed to fetch data.");


    const animeList = filterData(data).map((anime) => {
      return {
        id: anime.mal_id,
        image: anime.images.jpg.image_url,
        title: anime.title_english,
      };
    });

    res.status(200).json({
      message: "Top 10 anime list is fetched",
      year: year,
      season: getSeason(),
      animeList: animeList,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRecommendation = async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/top/anime`);

    if (!data) throw new Error("Failed to fetch data.");

    const animeList = filterData(data).map((anime) => {
      return {
        id: anime.mal_id,
        image: anime.images.jpg.image_url,
        title: anime.title_english,
      };
    });

    res.status(200).json({
      message: "Data fetched",
      animeList: animeList,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAnimeGenres = async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/genres/anime`);

    if (!data) throw new Error("Failed to fetch data.");

    const genreList = filterData(data).map((genre) => {
      return {
        id: genre.mal_id,
        name: genre.name,
        count: genre.count,
      };
    });

    res.status(200).json({
      message: "Genres fetched",
      data: genreList,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAnimeByGenre = async (req, res, next) => {
  try {
    const id = req.params.genreId;

    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime?genres=${id}`
    );

    if (!data) throw new Error("Failed to fetch data.");

    const animeList = filterData(data).map((anime) => {
      return {
        id: anime.mal_id,
        image: anime.images.jpg.image_url,
        title: anime.title,
        rank: anime.rank,
        score: anime.score,
        rating: anime.rating,
        popularity: anime.popularity,
        duration: anime.duration,
        episodes: anime.episodes,
        background: anime.background,
      };
    });

    res.status(200).json({
      message: "Fetched anime.",
      data: animeList,
    });
  } catch (err) {
    console.error(err);
  }
};

const filterData = function (data) {
  if (!data || !Array.isArray(data.data)) {
    console.error("Unexpected API response", data);
    return [];
  }
  const seenIds = new Set();

  const animeList = data.data.filter((anime) => {
    if (!seenIds.has(anime.mal_id)) {
      seenIds.add(anime.mal_id);
      return true;
    }
    return false;
  });

  return animeList;
};
