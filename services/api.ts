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

  // const data = await response.json();
  // return data.results;
}



// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmViMWI3MDkyN2FhZGMwZjFmZDhlMTBkYzRiOGM3MSIsIm5iZiI6MTc2MzU3MzY3Ny4zNTYsInN1YiI6IjY5MWRmZmFkNDM1ZmNiNThlMTZlMTg4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0PR2G4As3L8f0qf6myVGXn1nPI0rrVafVc1YruZze0w'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));