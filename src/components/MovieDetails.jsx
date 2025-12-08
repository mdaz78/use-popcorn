import React from 'react';
import StarRating from './StarRating';

const MovieDetails = () => {
  return (
    <div className='details'>
      <header>
        <button className='btn-back'>&larr;</button>
        <img src='' alt='' />
        <div className='details-overview'>
          <h2>title</h2>
          <p>released &bull; runtime</p>
          <p>genre</p>
          <p>
            <span>⭐️</span>rating IMdb rating
          </p>
        </div>
      </header>

      <section>
        <StarRating maxRating={10} size={24} />
        <p>
          <em>plot</em>
        </p>
        <p>starring actors</p>
        <p>directed by director</p>
      </section>
    </div>
  );
};

export default MovieDetails;
