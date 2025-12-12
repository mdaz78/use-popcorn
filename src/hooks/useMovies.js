import { useEffect, useState } from 'react';
import { API_URL } from '../config/constants';

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`${API_URL}&s=${query}`, {
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }

        if (!abortController.signal.aborted) {
          setMovies(data.Search);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return {
    movies,
    isLoading,
    error,
  };
};
