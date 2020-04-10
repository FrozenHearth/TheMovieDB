import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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
    padding: '1em 0'
  },
  searchMoviesInput: {
    width: '12em'
  },
  searchIcon: {
    position: 'relative',
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
  render() {
    const { classes } = this.props;
    const { searchResults, searchTerm } = this.state;
    return (
      <>
        <AppBar className={classes.searchMoviesInputWrapper} position="fixed">
          <Toolbar>
            <div className="search">
              <InputBase
                autoComplete="off"
                name="searchTerm"
                value={searchTerm}
                onChange={e => this.handleChange(e)}
                className={classes.searchMoviesInput}
                placeholder="Search Movies"
              />
              <IconButton className={classes.searchIcon}>
                <SearchIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {searchTerm !== '' ? (
          <Debounce ms={1000}>
            <SearchResults
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
          </Debounce>
        ) : null}
      </>
    );
  }
}

export default withStyles(styles)(Header);
