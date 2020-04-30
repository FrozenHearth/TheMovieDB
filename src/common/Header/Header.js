import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import SearchResults from './SearchResults';
import '../../styles/header/header.css';
import axios from 'axios';
import { movieSearchURL } from '../../utils/apiURLs';
import Debounce from 'react-debounce-component';
import Logo from '../../assets/images/tmdbLogo.svg';
import { AppBar, Toolbar, InputBase, Typography } from '@material-ui/core';

const styles = {
  searchMoviesInputWrapper: {
    alignItems: 'center',
    padding: '1em 0',
    backgroundColor: 'rgb(149, 134, 247)'
  },
  searchMoviesInput: {
    width: '12em'
  },
  searchIcon: {
    color: 'white'
  },
  closeIcon: {
    position: 'relative',
    right: '0',
    color: 'white'
  },
  headerToolbar: {
    width: '100%'
  },
  navItemMovie: {
    fontSize: '1.6em',
    lineHeight: '24px',
    fontWeight: '600',
    marginRight: '2em'
  },
  navItemPeople: {
    fontSize: '1.6em',
    lineHeight: '24px',
    fontWeight: '600'
  }
};

class Header extends Component {
  state = {
    searchTerm: '',
    searchResults: [],
    closeSearchResults: true
  };
  handleChange = e => {
    const { searchTerm } = this.state;
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

    if (searchTerm.trim() !== '') {
      axios
        .get(
          `${movieSearchURL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=true&query=${searchTerm}`
        )
        .then(item => {
          this.setState({ searchResults: item.data.results.slice(0, 10) });
        });
    } else {
      this.setState({
        searchResults: []
      });
    }
  };
  resetSearchTerm = () => {
    this.setState({
      searchTerm: '',
      searchResults: []
    });
  };
  closeSearchResultsDropdown = () => {
    this.setState({
      closeSearchResults: !this.state.closeSearchResults,
      searchTerm: '',
      searchResults: []
    });
  };
  redirectToHomePage = () => {
    this.props.history.push('/');
  };
  render() {
    const { classes } = this.props;
    const { path } = this.props.match;
    const { searchResults, searchTerm, closeSearchResults } = this.state;
    return (
      <>
        <AppBar
          style={
            path === '/'
              ? { backgroundColor: 'rgb(149, 134, 247)' }
              : path === `/movie/:id` || path === '/people/:id'
              ? { backgroundColor: 'rgb(66,66,66)' }
              : ''
          }
          className={classes.searchMoviesInputWrapper}
          position="fixed"
        >
          <img
            onClick={this.redirectToHomePage}
            src={Logo}
            width={175}
            className="brand-logo"
            alt="ss"
          />
          <li className="nav-list">
            <Typography variant="h6" className={classes.navItemMovie}>
              Movies
            </Typography>
            <Typography variant="h6" className={classes.navItemPeople}>
              People
            </Typography>
          </li>

          <Toolbar className={classes.headerToolbar}>
            <div className="search">
              <InputBase
                autoComplete="off"
                name="searchTerm"
                value={searchTerm}
                onChange={this.handleChange}
                className={classes.searchMoviesInput}
                placeholder="Search Movies"
              />
              <IconButton className={classes.searchIcon}>
                <SearchIcon />
              </IconButton>
              {searchTerm !== '' ? (
                <IconButton
                  onClick={this.resetSearchTerm}
                  className={classes.closeIcon}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                ''
              )}
              {searchResults.length !== 0 ? (
                <Debounce ms={1000}>
                  <SearchResults
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    closeSearchResultsDropdown={this.closeSearchResultsDropdown}
                    closeSearchResults={closeSearchResults}
                  />
                </Debounce>
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(Header);
