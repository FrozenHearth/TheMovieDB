import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../../styles/header/searchResults.css';
import { imageURL } from '../../utils/ImageURL';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#101010',
    padding: 0,
    color: 'white',
    '&:hover': {
      backgroundColor: '#3a3a3a'
    }
  },

  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)'
  },
  movieLink: {
    textDecoration: 'none'
  }
};

class SearchResults extends Component {
  state = {
    closeSearchResults: false
  };
  closeSearchResults = () => {
    this.setState({
      closeSearchResults: true
    });
  };
  render() {
    const { classes, searchResults, searchTerm } = this.props;
    const { closeSearchResults } = this.state;

    return (
      <div
        className={
          searchTerm !== '' ? 'search-results-wrapper' : 'hide-search-results'
        }
      >
        {searchResults && closeSearchResults === false
          ? searchResults.map((item, index) => (
              <Link key={index} className={classes.movieLink} to={`${item.id}`}>
                <List
                  onClick={() => this.closeSearchResults()}
                  className={classes.root}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem className={classes.listItemHover} button>
                    <ListItemText primary={item.title} />
                    {item.backdrop_path ? (
                      <Avatar src={`${imageURL}${item.backdrop_path}`} />
                    ) : (
                      <Avatar alt="avatar" />
                    )}
                  </ListItem>
                  <Divider className={classes.divider} />
                </List>
              </Link>
            ))
          : null}
      </div>
    );
  }
}

export default withStyles(styles)(SearchResults);
