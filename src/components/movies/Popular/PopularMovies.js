import React, { Component } from 'react';
import Navbar from '../../../common/Header/Navbar';
import MovieCard from '../../../common/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  actionGetPopularMovies,
  actionGetGenresForPopularMovies
} from '../../../redux/actions/popularMovies/action';
import '../../../styles/movies/index.css';
class PopularMovies extends Component {
  state = {
    popularMovies: [],
    popularMoviesGenres: []
  };
  componentDidMount() {
    this.props.actionGetPopularMovies().then(res => {
      const { results } = res;
      this.setState({
        popularMovies: [...results.slice(0, 12)]
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
        <Navbar {...this.props} />
        <div style={{ marginTop: '10em' }}>
          <h1 className="header-title">Popular Movies</h1>
          <div className="popular-movies-card-container">
            <MovieCard
              {...this.props}
              popularMovies={popularMovies}
              popularMoviesGenres={popularMoviesGenres}
            />
          </div>
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

export default connect(null, mapDispatchToProps)(PopularMovies);
