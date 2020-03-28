import React, { Component } from 'react';
import Header from '../../common/Header/Header';
import axios from 'axios';
import { baseURL } from '../../utils/BaseURL';

class MovieList extends Component {
  state = {
    popularMovies: []
  };
  getPopularMovies = () => {
    axios
      .get(
        `${baseURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const { results } = response.data;
        console.log(results);
        this.setState({
          popularMovies: results
        });
      });
  };

  componentDidMount() {
    this.getPopularMovies();
  }
  render() {
    return (
      <div>
        <Header />
        <div>Movie List</div>
      </div>
    );
  }
}

export default MovieList;
