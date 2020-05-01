import React from 'react';
import Navbar from '../../../common/Header/Navbar';
import MovieCard from '../../../common/MovieCard/MovieCard';

export const PopularMovies = props => {
  return (
    <>
      <Navbar {...props} />
      <div style={{ marginTop: '10em' }}>
        <h1>Popular Movies</h1>
        <MovieCard />
      </div>
    </>
  );
};
