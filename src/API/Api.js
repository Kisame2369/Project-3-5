import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// Добавим проверку токена
console.log("ACCESS_TOKEN:", ACCESS_TOKEN ? "✓ Токен загружен" : "✗ Токен отсутствует");

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  try {
    console.log("Запрос трендовых фильмов...");
    const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    console.log("Трендовые фильмы получены:", res.data.results?.length || 0);
    return res.data.results;
  } catch (error) {
    console.error("Ошибка при получении трендовых фильмов:", error.response?.data || error.message);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    console.log("Поиск фильмов по запросу:", query);
    const res = await axios.get(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      options
    );
    console.log("Найдено фильмов:", res.data.results?.length || 0);
    return res.data.results;
  } catch (error) {
    console.error("Ошибка при поиске фильмов:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    console.log("Получение деталей фильма ID:", id);
    const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
    console.log("Детали фильма получены:", res.data.title);
    return res.data;
  } catch (error) {
    console.error("Ошибка при получении деталей фильма:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchMovieCast = async (id) => {
  try {
    console.log("Получение каста фильма ID:", id);
    const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
    console.log("Каст получен:", res.data.cast?.length || 0, "актеров");
    return res.data.cast;
  } catch (error) {
    console.error("Ошибка при получении каста:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    console.log("Получение отзывов фильма ID:", id);
    const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
    console.log("Отзывы получены:", res.data.results?.length || 0);
    return res.data.results;
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error.response?.data || error.message);
    throw error;
  }
};