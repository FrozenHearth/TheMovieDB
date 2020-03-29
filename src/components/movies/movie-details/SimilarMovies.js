import React, { Component } from 'react';
import '../../../styles/movies/similarMovies.css';
import { imageURL } from '../../../utils/ImageURL';

export class SimilarMovies extends Component {
  openMovieInNewTab = id => {
    const win = window.open(`#/${id}`, '_blank');
    win.focus();
  };

  render() {
    const { similarMovies } = this.props;

    return (
      <div className="similar-movies-wrapper">
        <h1 className="similar-movies-header">Similar Movies</h1>
        {similarMovies
          ? similarMovies.map((similarMovie, index) => (
              <div key={index} className="similar-movies-poster-wrapper">
                <img
                  onClick={() => this.openMovieInNewTab(similarMovie.id)}
                  className="similar-movies-poster"
                  src={`${imageURL}${similarMovie.poster_path}`}
                  alt=""
                />
              </div>
            ))
          : ''}
      </div>
    );
  }
}

export default SimilarMovies;
