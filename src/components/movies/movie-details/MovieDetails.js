import React, { Component } from 'react';
import { movieURL } from '../../../utils/apiURLs';
import axios from 'axios';
import MovieDetailsCard from './MovieDetailsCard';

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    similarMovies: [],
    credits: {}
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${movieURL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => {
        this.setState({
          movieDetails: res.data
        });
      })
      .then(() => {
        axios
          .get(
            `${movieURL}${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
          )
          .then(res => {
            this.setState({
              similarMovies: res.data.results.slice(0, 4)
            });
          });
      })
      .then(() => {
        axios
          .get(
            `${movieURL}${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
          )
          .then(res => {
            this.setState({
              credits: res.data
            });
          });
      });
  }
  render() {
    const { movieDetails, similarMovies, credits } = this.state;
    return (
      <div className="movie-details-card-wrapper">
        <MovieDetailsCard
          credits={credits}
          similarMovies={similarMovies}
          details={movieDetails}
        />
      </div>
    );
  }
}

export default MovieDetails;
