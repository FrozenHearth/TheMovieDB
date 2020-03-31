import React from 'react';
import { smImageURL } from '../../utils/ImageURL';
import '.././../styles/people/mainDetails.css';
import { Link } from 'react-router-dom';

const Main = props => {
  const { castDetails, moviesKnownFor } = props;

  return (
    <div className="main-container">
      <div className="main-content">
        <h1 className="main-content-cast-name">{castDetails.name}</h1>
        <h1 className="main-content-title">Biography</h1>
        <p className="biography-description">
          {castDetails.biography ? castDetails.biography : null}
        </p>
        <h1 className="main-content-title">Known For</h1>
        <div className="movies-known-for-container">
          {moviesKnownFor
            ? moviesKnownFor
                .slice(0, 10)
                .filter(el => el.poster_path !== null)
                .map(movie => (
                  <li
                    key={movie.id}
                    className="movies-known-for-image-container"
                  >
                    {movie.poster_path ? (
                      <Link to={`/${movie.id}`}>
                        <img
                          className="movies-known-for-images"
                          src={`${smImageURL}${movie.poster_path}`}
                          alt=""
                        />
                      </Link>
                    ) : null}
                    <p className="movies-known-for-title">{movie.title}</p>
                  </li>
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
