import React, { Component } from 'react';
import Navbar from '../../common/Header/Navbar';
import HeroBanner from '../../assets/images/hero_banner.png';
import '../../styles/home/landing.css';
import MovieCard from '../../common/MovieCard/MovieCard';

import {
  actionGetPopularMovies,
  actionGetGenresForPopularMovies
} from '../../redux/actions/popularMovies/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const LoadMoreButtonStyles = {
  loadMoreBtn: {
    width: '55.3em',
    left: '7.9em',
    marginBottom: '2em',
    textTransform: 'capitalize',
    fontSize: '2em',
    color: '#fff',
    background: 'rgb(3, 37, 65)',
    '&:hover': {
      background: 'rgb(3, 37, 55)',
      color: 'rgb(255, 240, 230)'
    }
  },
  loadingProgress: {
    position: 'absolute',
    top: '25%',
    left: '47%',
    color: '#fff'
  }
};

class LandingPage extends Component {
  state = {
    popularMovies: [],
    popularMoviesGenres: [],
    pageNumber: 1,
    loadingPopularMovies: null,
    disableBtn: null
  };

  componentDidMount() {
    const { pageNumber } = this.state;
    this.props.actionGetPopularMovies(pageNumber).then(res => {
      this.setState({
        popularMovies: res.results
      });
    });
    this.props.actionGetGenresForPopularMovies().then(genres => {
      this.setState({
        popularMoviesGenres: genres
      });
    });
  }
  loadMorePopularResults = () => {
    this.setState(
      {
        pageNumber: this.state.pageNumber + 1,
        loadingPopularMovies: true,
        disableBtn: true
      },
      () => {
        this.props
          .actionGetPopularMovies(this.state.pageNumber)
          .then(res => {
            this.setState({
              popularMovies: [...this.state.popularMovies].concat(res.results)
            });
          })
          .then(() => {
            this.setState({
              loadingPopularMovies: false,
              disableBtn: false
            });
          })
          .catch(() =>
            this.setState({
              loadingPopularMovies: false,
              disableBtn: false
            })
          );
      }
    );
  };
  render() {
    const {
      popularMovies,
      popularMoviesGenres,
      disableBtn,
      loadingPopularMovies
    } = this.state;
    const { classes, ...other } = this.props;

    return (
      <>
        <div className="homepage-wrapper">
          <Navbar {...this.state} {...other} />
          <div className="hero-container">
            <img className="hero-banner" src={HeroBanner} alt="Hero" />
            <h2 className="hero-text-header">Welcome to TheMovieDB.</h2>
            <h3 className="hero-subtext">
              Thousands of English-language movies & people to discover. Explore
              now.
            </h3>
          </div>
        </div>

        <h1 className="content-header">What's Trending</h1>
        <div className="movie-card-container">
          <MovieCard
            {...other}
            popularMovies={popularMovies}
            popularMoviesGenres={popularMoviesGenres}
          />
        </div>
        <Button
          disabled={disableBtn}
          variant="outlined"
          className={classes.loadMoreBtn}
          onClick={this.loadMorePopularResults}
        >
          Load More...
          {loadingPopularMovies && (
            <CircularProgress className={classes.loadingProgress} size={24} />
          )}
        </Button>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetPopularMovies,
      actionGetGenresForPopularMovies
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(LoadMoreButtonStyles)(LandingPage));
