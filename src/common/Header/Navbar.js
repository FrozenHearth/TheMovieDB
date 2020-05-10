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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindMenu, bindHover } from 'material-ui-popup-state';

const styles = {
  searchMoviesInputWrapper: {
    alignItems: 'center',
    padding: '1em 0',
    backgroundColor: 'rgb(3,37,65)'
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
    color: '#fff',
    background: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    bottom: '0.4em',
    fontSize: '0.8em',
    lineHeight: '24px',
    fontWeight: 600,
    marginRight: '2em'
  },
  navItemPeople: {
    color: '#fff',
    background: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    bottom: '0.4em',
    fontSize: '0.8em',
    lineHeight: '24px',
    fontWeight: 600
  }
};

class Navbar extends Component {
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
    const { searchResults, searchTerm, closeSearchResults } = this.state;
    return (
      <>
        <AppBar className={classes.searchMoviesInputWrapper} position="fixed">
          <img
            onClick={this.redirectToHomePage}
            src={Logo}
            width={175}
            className="brand-logo"
            alt="ss"
          />
          <li className="nav-list">
            <>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <Typography variant="h6">
                      <button
                        className={classes.navItemMovie}
                        {...bindHover(popupState)}
                      >
                        {' '}
                        Movies
                      </button>
                    </Typography>
                    <Menu style={{ top: '4em' }} {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => this.props.history.push('/popular')}
                      >
                        Popular
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.props.history.push('/now-playing')}
                      >
                        Now Playing
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          this.props.history.push('/upcoming-movies')
                        }
                      >
                        Upcoming
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <Typography variant="h6">
                      <button
                        {...bindHover(popupState)}
                        className={classes.navItemPeople}
                      >
                        {' '}
                        People
                      </button>
                    </Typography>
                    <Menu style={{ top: '4em' }} {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => this.props.history.push('/people')}
                      >
                        Popular People
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </>
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

export default withStyles(styles)(Navbar);
