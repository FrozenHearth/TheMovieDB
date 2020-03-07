import React, { Component } from 'react';
import { movieDetails } from '../../../utils/apiURLs';
import axios from 'axios';
import MovieDetailsCard from './MovieDetailsCard';

class MovieDetails extends Component {
  state = {
    movieDetails: {}
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `${movieDetails}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => {
        this.setState({
          movieDetails: res.data
        });
      });
  }
  render() {
    const { movieDetails } = this.state;
    return (
      <>
        <MovieDetailsCard details={movieDetails} />
      </>
    );
  }
}

export default MovieDetails;
