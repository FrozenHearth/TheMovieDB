import React, { Component } from 'react';
import MovieDetailsCard from './MovieDetailsCard';
import Navbar from '../Header/Navbar';
import {
  actionGetMovieDetails,
  actionGetMovieCredits,
  actionGetSimilarMovies
} from '../../redux/actions/movieDetails/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    similarMovies: [],
    credits: {}
  };
  getMovieDetails = () => {
    const { id } = this.props.match.params;
    this.props.actionGetMovieDetails(id).then(details => {
      this.setState({
        movieDetails: details
      });
    });
  };
  getSimilarMovies = () => {
    const { id } = this.props.match.params;

    this.props.actionGetSimilarMovies(id).then(res => {
      this.setState({
        similarMovies: res.results.slice(0, 10)
      });
    });
  };
  getMovieCredits = () => {
    const { id } = this.props.match.params;

    this.props.actionGetMovieCredits(id).then(credits => {
      this.setState({
        credits
      });
    });
  };
  getData = () => {
    this.getMovieDetails();
    this.getSimilarMovies();
    this.getMovieCredits();
  };
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    // If route changes, re-render the component
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getData();
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetMovieDetails,
      actionGetMovieCredits,
      actionGetSimilarMovies
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(MovieDetails);
