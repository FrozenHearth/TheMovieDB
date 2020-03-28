import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { fullImage } from '../../../utils/ImageURL';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import '../../../styles/movies/movieDetailsCard.css';
import SimilarMovies from './SimilarMovies';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
  }
};

const MovieDetailsCard = props => {
  const { details, similarMovies, credits, classes } = props;
  console.log(credits);
  console.log(details);

  return (
    <div className="movie-details-wrapper">
      <Container
        style={{
          position: 'relative',
          color: 'white',
          height: '100%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${fullImage ||
            ''}${details.backdrop_path || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }}
        maxWidth="md"
      >
        <h2 className="movie-title">{details.title}</h2>
        <span className="movie-tagline">{details.tagline || ''}</span>
        <div className="subtitles-container">
          <span className="movie-release-date">
            {moment(details.release_date).format('YYYY')}
          </span>
          <span className="vertical-divider"></span>
          <span className="movie-runtime">{details.runtime} mins</span>

          <span className="vertical-divider"></span>
          {details.adult === false ? (
            <span className="movie-category">PG-13</span>
          ) : (
            <span className="movie-category">Adult</span>
          )}
        </div>
        <Rating
          style={{
            marginTop: '0.5em'
          }}
          name="half-rating-read"
          readOnly
          value={details.vote_average ? parseFloat(details.vote_average) : 0}
          precision={0.5}
          max={10}
        />
        <div className="movie-overview-wrapper">
          <p className="movie-overview">{details.overview}</p>
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

        <div className="similar-movies">
          <SimilarMovies similarMovies={similarMovies} />
        </div>
      </Container>
    </div>
  );
};

export default withStyles(styles)(MovieDetailsCard);
