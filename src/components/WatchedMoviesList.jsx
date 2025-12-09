import React from 'react';
import WatchedMovies from './WatchedMovies';

const WatchedMoviesList = ({ watched, onDeleteWatchedMovie }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovies
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
