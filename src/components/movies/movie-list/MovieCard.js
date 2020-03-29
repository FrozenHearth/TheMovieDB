import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { imageURL } from '../../../utils/ImageURL';
import { withStyles } from '@material-ui/core/styles';
import { trunc } from '../../../utils/truncateString';
import { Link } from 'react-router-dom';
import '../../../styles/movies/movieList.css';

const styles = {
  movieCard: {
    width: '33em',
    margin: '1em auto 2em 2em',
    background: '#1a1421',
    color: 'white'
  },
  movieSubtext: {
    color: 'grey'
  },
  movieSummaryTitle: {
    color: 'white'
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
                <CardMedia>
                  <img
                    className="movie_poster"
                    src={`${imageURL}${movie.poster_path}`}
                    alt="movie_poster"
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {movie.title}
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
                  <Typography
                    className={classes.movieSummaryTitle}
                    variant="body1"
                    color="textSecondary"
                    component="h5"
                  >
                    SUMMARY
                  </Typography>
                  <Typography
                    className={classes.movieSubtext}
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {trunc(movie.overview, 90)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link className={classes.btnLink} to={`${movie.id}`}>
                    <Button className={classes.viewDetails} size="medium">
                      View Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))
          : ''}
      </>
    );
  }
}

export default withStyles(styles)(MovieCard);
