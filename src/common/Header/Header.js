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
import { AppBar, Toolbar, InputBase } from '@material-ui/core';

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
  }
};

class Header extends Component {
  state = {
    searchTerm: '',
    searchResults: []
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
  render() {
    const { classes } = this.props;
    const { path } = this.props.match;
    const { searchResults, searchTerm } = this.state;
    return (
      <>
        <AppBar
          style={
            path !== '/:id'
              ? { backgroundColor: 'rgb(149, 134, 247)' }
              : path === '/:id'
              ? { backgroundColor: 'rgb(66,66,66)' }
              : ''
          }
          className={classes.searchMoviesInputWrapper}
          position="fixed"
        >
          <Toolbar>
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
            </div>
          </Toolbar>
          {searchResults.length !== 0 ? (
            <Debounce ms={1000}>
              <SearchResults
                searchTerm={searchTerm}
                searchResults={searchResults}
              />
            </Debounce>
          ) : null}
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(Header);
