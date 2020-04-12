import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { fullImage } from '../../../utils/ImageURL';
import moment from 'moment';
import Button from '@material-ui/core/Button';

import '../../../styles/movies/movieDetailsCard.css';
import SimilarMovies from './SimilarMovies';
import { withStyles } from '@material-ui/core/styles';
import MovieCast from './MovieCast';
import { CircularProgress } from '@material-ui/core';

const styles = {
  movieDetailsContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'white',
    margin: '8em 0 0 0',
    overflow: 'hidden',
    overscrollBehavior: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    backgroundSize: '100%',
    backgroundPosition: 'left top',
    backgroundRepeat: 'no-repeat'
  },
  movieHomepage: {
    fontSize: '1.5em',
    background: '#ea452f',
    padding: '0.5em 2em',
    marginBottom: '1.6em',
    color: 'white',
    '&:hover': {
      background: '#ce3e2b'
    },
    borderRadius: '0'
  },
  movieIMDBPage: {
    fontSize: '1.5em',
    padding: '0.5em 2em',
    marginLeft: '1em',
    marginBottom: '1.6em',
    color: 'white',
    borderRadius: '0',
    background: 'black',
    border: '2px solid #1d2424'
  },
  castLink: {
    textDecoration: 'none'
  },
  movieRating: {
    position: 'relative',
    bottom: '0.5em'
  },
  progressColorHigh: {
    color: '#62d17b'
  },
  progressColorMedium: {
    color: '#d3d632'
  },
  progressColorLow: {
    color: '#dc4460'
  }
};

const MovieDetailsCard = props => {
  const { details, similarMovies, credits, classes } = props;

  return (
    <>
      <div
        className={classes.movieDetailsContainer}
        style={
          details.backdrop_path
            ? {
                backgroundImage: `linear-gradient(to right, rgba(31, 31, 31, 0.8), rgba(72, 72, 72, 0.9)), 
        url(${fullImage}${details.backdrop_path})`
              }
            : {
                backgroundImage: `linear-gradient(to right, rgba(31, 31, 31, 0.8), rgba(72, 72, 72, 0.9)), 
        url(${fullImage}${details.poster_path})`
              }
        }
      >
        <aside className="movie-poster-container">
          {details.poster_path ? (
            <img
              className="movie-poster"
              src={`${fullImage}${details.poster_path}`}
              alt=""
            />
          ) : null}
        </aside>
        <main className="movie-main-content">
          <h2 className="movie-title">
            {details.title}{' '}
            <span className="movie-release-year">
              ({moment(details.release_date).format('YYYY')})
            </span>
          </h2>

          <div className="subtitles-container">
            <span className="movie-release-date">
              {moment(details.release_date).format('DD/MM/YYYY')}
            </span>
            <span className="vertical-divider"></span>
            <span className="movie-runtime">{details.runtime} mins</span>

            <span className="vertical-divider"></span>
            {details.adult === false ? (
              <span className="movie-category">PG-13</span>
            ) : (
              <span className="movie-category">R</span>
            )}
            <span className="vertical-divider"></span>
            {details.genres
              ? details.genres.map(genre => (
                  <span className="movie-genres-list" key={genre.id}>
                    <span className="movie-genres">{genre.name}</span>
                  </span>
                ))
              : ''}
          </div>
          <span className="percentage-circle-container-1">
            <span className="percentage-circle-1">
              <span className="percentage-text-1">
                {details.vote_average * 10}{' '}
              </span>
              <span className="percentage-1">%</span>
            </span>
            <CircularProgress
              size={60}
              className={
                details.vote_average * 10 >= 66
                  ? `${classes.progressColorHigh}`
                  : details.vote_average * 10 > 33 &&
                    details.vote_average * 10 < 66
                  ? `${classes.progressColorMedium}`
                  : details.vote_average * 10 < 33
                  ? `${classes.progressColorLow}`
                  : ``
              }
              variant="static"
              value={details.vote_average * 10}
            />
          </span>
          {/* <Rating
            className={classes.movieRating}
            name="half-rating-read"
            readOnly
            value={details.vote_average ? parseFloat(details.vote_average) : 0}
            precision={0.5}
            max={10}
          /> */}
          <div className="movie-tagline">{details.tagline || ''}</div>
          <div className="movie-overview-wrapper">
            <h2 className="movie-overview">Overview</h2>
            <p className="movie-overview-content">{details.overview}</p>
          </div>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${details.homepage}`}
          >
            <Button className={classes.movieHomepage} variant="contained">
              Homepage
            </Button>
          </a>
          <a
            className="movie-title-link"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://www.imdb.com/title/${details.imdb_id}`}
          >
            <Button className={classes.movieIMDBPage}> IMDb Link</Button>
          </a>
        </main>
      </div>
      <MovieCast credits={credits} />

      <div className="similar-movies">
        <SimilarMovies similarMovies={similarMovies} />
      </div>
    </>
  );
};

export default withStyles(styles)(MovieDetailsCard);
