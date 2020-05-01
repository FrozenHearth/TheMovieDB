import React, { Component } from 'react';
import { movieURL } from '../../../utils/apiURLs';
import axios from 'axios';
import MovieDetailsCard from './MovieDetailsCard';
import Navbar from '../../../common/Header/Navbar';

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    similarMovies: [],
    credits: {}
  };
  getMovieDetails = () => {
    const { id } = this.props.match.params;
    axios
      .get(
        `${movieURL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => {
        this.setState({
          movieDetails: res.data
        });
      });
  };
  getSimilarMovies = () => {
    const { id } = this.props.match.params;

    axios
      .get(
        `${movieURL}${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then(res => {
        this.setState({
          similarMovies: res.data.results.slice(0, 10)
        });
      });
  };
  getMovieCredits = () => {
    const { id } = this.props.match.params;

    axios
      .get(`${movieURL}${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        this.setState({
          credits: res.data
        });
      });
  };
  componentDidMount() {
    this.getMovieDetails();
    this.getSimilarMovies();
    this.getMovieCredits();
  }

  componentDidUpdate(prevProps) {
    // If route changes, re-render the component
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getMovieDetails();
      this.getSimilarMovies();
      this.getMovieCredits();
    }
  }
  render() {
    const { movieDetails, similarMovies, credits } = this.state;
    return (
      <>
        <Navbar {...this.props} />
        <MovieDetailsCard
          credits={credits}
          similarMovies={similarMovies}
          details={movieDetails}
        />
      </>
    );
  }
}

export default MovieDetails;
