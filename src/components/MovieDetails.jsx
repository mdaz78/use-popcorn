import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import StarRating from './StarRating';

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(`${API_URL}&i=${selectedId}`);

        if (!response.ok) {
          throw new Error('Something went wrong with fetching movie details');
        }

        const data = await response.json();

        setIsLoading(false);
        setMovie(data);

        console.log(data);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [selectedId]);

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating: rating = 0,
    Plot: plot,
    Actors: actors,
    Director: director,
    Poster: poster,
  } = movie || {};

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: title,
      year: released,
      poster: poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(rating),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  return (
    <div className='details'>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {rating} IMdb rating
              </p>
              <p>
                <span>🌟</span>
                <span>Your rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className='btn-add' onClick={handleAdd}>
                  + Add to List
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring - {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorComponent message={error} />}
    </div>
  );
};

export default MovieDetails;
