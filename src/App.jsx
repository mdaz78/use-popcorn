import { useState } from 'react';

import Main from './components/layout/Main';
import NavBar from './components/layout/NavBar';
import NumResults from './components/layout/NumResults';
import MovieList from './components/movie/MovieList';
import Search from './components/movie/Search';
import Box from './components/ui/Box';
import ErrorComponent from './components/ui/ErrorComponent';
import Loader from './components/ui/Loader';
import WatchedMoviesList from './components/watched/WatchedMoviesList';
import WatchedSummary from './components/watched/WatchedSummary';

import MovieDetails from './components/movie/MovieDetails';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useMovies } from './hooks/useMovies';

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
