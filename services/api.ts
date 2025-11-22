export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query ?
    `/search/movie?query=${encodeURIComponent(query)}` :
    `/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (response.status === 204) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: HTTP ${response.status}`);
  }


  const text = await response.text();
  if (!text) {
    return [];
  }

  const data = JSON.parse(text);

  return data.results || [];

}

export const fetchPopularMovies = async () => {
  const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/top_rated`, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (response.status === 204) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: HTTP ${response.status}`);
  }


  const text = await response.text();
  if (!text) {
    return [];
  }

  const data = JSON.parse(text);

  return data.results || [];
}