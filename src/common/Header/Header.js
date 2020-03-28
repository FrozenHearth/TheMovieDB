import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import SearchResults from './SearchResults';
import '../../styles/header/header.css';
import axios from 'axios';
import { movieSearchURL } from '../../utils/apiURLs';
import Debounce from 'react-debounce-component';

const styles = {
  searchMoviesInputWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  searchMoviesInput: {
    width: '15em'
  },
  searchIcon: {
    position: 'relative',
    right: '1.5em',
    color: 'grey'
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

    if (searchTerm !== '') {
      axios
        .get(
          `${movieSearchURL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=true&query=${searchTerm}`
        )
        .then(item => {
          this.setState({ searchResults: item.data.results.slice(0, 10) });
        });
    } else {
      return;
    }
  };
  render() {
    const { classes, searchTerm } = this.props;
    const { searchResults } = this.state;
    return (
      <>
        <div className={classes.searchMoviesInputWrapper}>
          <Input
            autoComplete="off"
            name="searchTerm"
            value={searchTerm}
            onChange={e => this.handleChange(e)}
            className={classes.searchMoviesInput}
            placeholder="Search Movies"
            inputProps={{ 'aria-label': 'description' }}
          />
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
        </div>
        {searchResults.length ? (
          <Debounce ms={2000}>
            <SearchResults searchResults={searchResults} />
          </Debounce>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default withStyles(styles)(Header);