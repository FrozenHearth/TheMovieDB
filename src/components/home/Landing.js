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

class LandingPage extends Component {
  state = {
    popularMovies: [],
    popularMoviesGenres: []
  };

  componentDidMount() {
    this.props.actionGetPopularMovies().then(res => {
      this.setState({
        popularMovies: res.results.slice(0, 12)
      });
    });
    this.props.actionGetGenresForPopularMovies().then(genres => {
      this.setState({
        popularMoviesGenres: genres
      });
    });
  }
  render() {
    const { popularMovies, popularMoviesGenres } = this.state;

    return (
      <>
        <div className="homepage-wrapper">
          <Navbar {...this.state} {...this.props} />
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
            {...this.props}
            popularMovies={popularMovies}
            popularMoviesGenres={popularMoviesGenres}
          />
        </div>
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

export default connect(null, mapDispatchToProps)(LandingPage);
