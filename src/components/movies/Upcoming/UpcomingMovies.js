import React, { Component } from 'react';
import Navbar from '../../../common/Header/Navbar';
import MovieCard from '../../../common/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionGetUpcomingMovies } from '../../../redux/actions/upcomingMovies/action';
class UpcomingMovies extends Component {
  state = {
    upcomingMovies: []
  };
  componentDidMount() {
    this.props.actionGetUpcomingMovies().then(res => {
      const { results } = res;
      this.setState({
        upcomingMovies: [...results.slice(0, 15)]
      });
    });
  }
  render() {
    const { upcomingMovies } = this.state;

    return (
      <>
        <Navbar {...this.props} />
        <div style={{ marginTop: '10em' }}>
          <h1 className="header-title">Upcoming Movies</h1>
          <div className="upcoming-movies-card-container">
            <MovieCard {...this.props} upcomingMovies={upcomingMovies} />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetUpcomingMovies
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(UpcomingMovies);
