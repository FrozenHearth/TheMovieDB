import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../../styles/movies/movieCard.css';
import { imageURL } from '../../utils/ImageURL';

const styles = {
  movieCard: {
    margin: '0 6em 7em 4em',
    width: '20em',
    position: 'relative',
    left: '12em'
  },
  movieTitle: {
    fontSize: '1.6em',
    position: 'relative',
    bottom: '2em',
    fontWeight: '900'
  },
  movieSubtext: {
    position: 'relative',
    bottom: '2em'
  },
  viewDetails: {
    border: '1px solid red',
    borderRadius: '5%',
    margin: '0 0 2em 0.8em',
    color: 'red'
  },
  btnLink: {
    textDecoration: 'none'
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

class MovieCard extends Component {
  render() {
    const { popularMovies, classes } = this.props;

    return (
      <>
        {popularMovies
          ? popularMovies.map((movie, index) => (
              <Card className={classes.movieCard} key={index}>
                <Link className={classes.btnLink} to={`/movie/${movie.id}`}>
                  <CardMedia>
                    <img
                      className="movie-poster-x"
                      src={`${imageURL}${movie.poster_path}`}
                      alt="Movie poster"
                    />
                  </CardMedia>
                  <CardContent>
                    <span className="percentage-circle-container">
                      <span className="percentage-circle">
                        <span className="percentage-text">
                          {movie.vote_average * 10}{' '}
                        </span>
                        <span className="percentage">%</span>
                      </span>
                      <CircularProgress
                        className={
                          movie.vote_average * 10 >= 66
                            ? `${classes.progressColorHigh}`
                            : movie.vote_average * 10 > 33 &&
                              movie.vote_average * 10 < 66
                            ? `${classes.progressColorMedium}`
                            : movie.vote_average * 10 < 33
                            ? `${classes.progressColorLow}`
                            : ``
                        }
                        variant="static"
                        value={movie.vote_average * 10}
                      />
                    </span>
                    <Typography
                      className={classes.movieTitle}
                      variant="h6"
                      component="h2"
                    >
                      {movie.title}
                    </Typography>
                    {/* <Typography
                      className={classes.movieSubtext}
                      variant="body1"
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      {movie.release_date}
                    </Typography> */}
                  </CardContent>
                </Link>
              </Card>
            ))
          : ''}
      </>
    );
  }
}

export default withStyles(styles)(MovieCard);
