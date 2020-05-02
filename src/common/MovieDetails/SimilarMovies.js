import React, { Component } from 'react';
import '../../styles/movies/similarMovies.css';
import { withRouter } from 'react-router-dom';
import { fullImage } from '../../utils/ImageURL';

export class SimilarMovies extends Component {
  openMovieInNewTab = id => {
    const win = window.open(`#/${id}`, '_blank');
    win.focus();
  };

  render() {
    const { similarMovies } = this.props;

    return (
      <>
        <h2 className="similar-movies-header">Similar Movies</h2>
        <div className="similar-movies-wrapper">
          {similarMovies
            ? similarMovies.map((similarMovie, index) => (
                <li key={index} className="similar-movies-poster-wrapper">
                  <img
                    onClick={() =>
                      this.props.history.push(`${similarMovie.id}`)
                    }
                    className="similar-movies-poster"
                    src={`${fullImage}${similarMovie.poster_path}`}
                    alt=""
                  />
                </li>
              ))
            : ''}
        </div>
      </>
    );
  }
}

export default withRouter(SimilarMovies);
