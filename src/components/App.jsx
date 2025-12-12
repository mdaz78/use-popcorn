import { useState } from 'react';

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

import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useMovies } from '../hooks/useMovies';
import MovieDetails from './MovieDetails';

export default function App() {
  const [watched, setWatched] = useLocalStorageState('watched', []);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  function handleQuery(term) {
    setQuery(term);
  }

  function handleSelectMovie(movieId) {
    setSelectedId(movieId);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleSetWatchedMovie(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatchedMovie(movieId) {
    const updatedWatchedList = watched.filter(
      (movie) => movie.imdbID !== movieId
    );
    setWatched(updatedWatchedList);
  }

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
              onAddWatched={handleSetWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
