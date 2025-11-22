export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
};

const tmdbRequest = async (endpoint: string) => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (response.status === 204) return null;

  if (!response.ok) {
    throw new Error(`TMDB request failed: HTTP ${response.status}`);
  }

  const text = await response.text();
  if (!text) return null;

  return JSON.parse(text);
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;

  const data = await tmdbRequest(endpoint);
  return data?.results || [];
};

export const fetchPopularMovies = async () => {
  const data = await tmdbRequest('/movie/top_rated');
  return data?.results || [];
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  return tmdbRequest(`/movie/${movieId}`);
};