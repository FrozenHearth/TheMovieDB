import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { fullImage, imageURL } from '../../../utils/ImageURL';
import '../../../styles/movies/movieDetailsCard.css';

const styles = {
  detailsContainer: {
    color: 'white',
    display: 'flex',
    width: '80%',
    height: '650px',
    margin: '3em auto 0 auto'
  },
  paper: {
    width: '100%',
    display: 'flex',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  },
  movieTitle: {
    textTransform: 'uppercase',
    fontWeight: '500',
    padding: '1em'
  },
  movieTagline: {
    fontStyle: 'italic'
  },
  genreName: {
    borderRadius: '10%',
    padding: '0.2em',
    marginLeft: '0.5em',
    border: '3px solid grey'
  }
};

class MovieDetailsCard extends Component {
  render() {
    const { details, classes } = this.props;
    console.log(details);

    return (
      <Container className={classes.detailsContainer}>
        <Paper className={classes.paper}>
          <img
            className="movie_poster"
            src={`${imageURL}${details.poster_path}` || ''}
            alt=""
          />
          <aside className="movie-details">
            <Typography
              className={classes.movieTitle}
              variant="h5"
              component="p"
            >
              {details.title}
            </Typography>
            <Typography
              className={classes.movieTagline}
              gutterBottom
              variant="h6"
              component="p"
              style={{ marginLeft: '1em', marginBottom: '1em' }}
            >
              {details.tagline}
            </Typography>
            <span className="more_details">
              <Typography
                style={{ marginLeft: '1em' }}
                gutterBottom
                variant="h6"
                component="span"
              >
                {details.release_date
                  ? details.release_date.substring(0, 4)
                  : ''}
              </Typography>
              <Typography
                style={{ marginLeft: '1em', marginRight: '1em' }}
                gutterBottom
                variant="h6"
                component="span"
              >
                {details.runtime} mins
              </Typography>
              <span className="genres-container">
                {details.genres
                  ? details.genres.map((genre, index) => (
                      <Typography
                        key={index}
                        gutterBottom
                        className={classes.genreName}
                        variant="h6"
                        component="span"
                      >
                        {'  '}
                        {genre.name}
                      </Typography>
                    ))
                  : 'NA'}
              </span>
            </span>
            <Rating
              style={{ marginLeft: '0.6em', marginTop: '0.5em' }}
              name="half-rating-read"
              readOnly
              value={
                details.vote_average ? parseFloat(details.vote_average) : 0
              }
              precision={0.5}
              max={10}
            />
            <Typography
              style={{
                marginLeft: '1em',
                marginTop: '1em',
                marginRight: '0.5em'
              }}
              gutterBottom
              variant="h6"
              component="p"
            >
              {details.overview}
            </Typography>
          </aside>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(MovieDetailsCard);
