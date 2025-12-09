import { useEffect, useState } from 'react';

import Box from './Box';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import Main from './Main';
import MovieList from './MovieList';
import NavBar from './NavBar';
import NumResults from './NumResults';
import Search from './Search';
import WatchedMoviesList from './WatchedMoviesList';
import WatchedSummary from './WatchedSummary';

import { URL } from '../constants';
import MovieDetails from './MovieDetails';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, _setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('inception');
  const [selectedId, setSelectedId] = useState(null);

  const handleQuery = (term) => setQuery(term);

  const handleSelectMovie = (movieId) => setSelectedId(movieId);

  const handleCloseMovie = () => setSelectedId(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`${URL}&s=${query}`);

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          console.log('here');
          throw new Error('Movie not found');
        }

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={handleQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorComponent message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
