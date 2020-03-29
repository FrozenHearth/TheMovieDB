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
  render() {
    const { classes, searchResults, searchTerm } = this.props;

    return (
      <div
        className={
          searchTerm !== '' ? 'search-results-wrapper' : 'hide-search-results'
        }
      >
        {searchResults
          ? searchResults.map((item, index) => (
              <Link className={classes.movieLink} to={`${item.id}`}>
                <List
                  key={index}
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
          : ''}
      </div>
    );
  }
}

export default withStyles(styles)(SearchResults);
