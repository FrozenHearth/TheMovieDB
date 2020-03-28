import React, { Component } from 'react';
import Header from '../../../common/Header';

import axios from 'axios';
import {
  popularMoviesURL,
  popularMoviesGenresURL
} from '../../../utils/apiURLs';
import '../../../styles/movies/movieList.css';
import MovieCard from './MovieCard';

class MovieList extends Component {
  state = {
    popularMovies: [],
    popularMoviesGenres: []
  };
  getPopularMovies = () => {
    axios
      .get(
        `${popularMoviesURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const results = [...response.data.results.slice(0, 9)];
        this.setState({
          popularMovies: results
        });
      });
  };

  getGenresForPopularMovies = () => {
    axios
      .get(
        `${popularMoviesGenresURL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => {
        const { genres } = res.data;
        this.setState({
          popularMoviesGenres: genres
        });
      });
  };

  componentDidMount() {
    this.getPopularMovies();
    this.getGenresForPopularMovies();
  }
  render() {
    const { popularMovies, popularMoviesGenres } = this.state;
    return (
      <div className="movie-list-wrapper">
        <Header />
        <div className="movie_card_container">
          <MovieCard
            popularMovies={popularMovies}
            popularMoviesGenres={popularMoviesGenres}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
