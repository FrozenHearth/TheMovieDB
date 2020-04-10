import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { imageURL } from '../../../utils/ImageURL';
import { withStyles } from '@material-ui/core/styles';
import { trunc } from '../../../utils/truncateString';
import { Link } from 'react-router-dom';
import '../../../styles/movies/movieList.css';

const styles = {
  movieCard: {
    margin: '0 6em 7em 4em',
    width: '20em',
    position: 'relative',
    left: '12em'
  },
  movieTitle: {
    fontSize: '1.5em'
  },
  viewDetails: {
    border: '1px solid red',
    borderRadius: '5%',
    margin: '0 0 2em 0.8em',
    color: 'red'
  },
  btnLink: {
    textDecoration: 'none'
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
                <Link className={classes.btnLink} to={`${movie.id}`}>
                  <CardMedia>
                    <img
                      className="movie_poster"
                      src={`${imageURL}${movie.poster_path}`}
                      alt="movie_poster"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      className={classes.movieTitle}
                      variant="h6"
                      component="h2"
                    >
                      {trunc(movie.title, 30)}
                    </Typography>
                    <Typography
                      className={classes.movieSubtext}
                      variant="body1"
                      gutterBottom
                      color="textSecondary"
                      component="p"
                    >
                      {movie.adult === false ? 'Not Adult' : 'Adult'} /{' '}
                      {movie.original_language} / {movie.vote_average}
                    </Typography>
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
