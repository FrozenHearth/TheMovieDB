import React, { Component } from 'react';
import Navbar from '../../../common/Header/Navbar';
import MovieCard from '../../../common/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionGetNowPlayingMovies } from '../../../redux/actions/nowPlaying/action';
class NowPlayingMovies extends Component {
  state = {
    nowPlayingMovies: []
  };
  componentDidMount() {
    this.props.actionGetNowPlayingMovies().then(res => {
      const { results } = res;
      this.setState({
        nowPlayingMovies: [...results.slice(0, 15)]
      });
    });
  }
  render() {
    const { nowPlayingMovies } = this.state;

    return (
      <>
        <Navbar {...this.props} />
        <div style={{ marginTop: '10em' }}>
          <h1 className="header-title">Now Playing</h1>
          <div className="now-playing-movies-card-container">
            <MovieCard {...this.props} nowPlayingMovies={nowPlayingMovies} />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetNowPlayingMovies
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(NowPlayingMovies);
