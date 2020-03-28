import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from '@material-ui/core';
import '../../styles/header/searchResults.css';
import { imageURL } from '../../utils/ImageURL';

const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    padding: 0
  }
};

class SearchResults extends Component {
  render() {
    const { classes, searchResults, searchTerm } = this.props;
    console.log(searchTerm);

    return (
      <div
        className={
          searchTerm !== '' ? 'search-results-wrapper' : 'hide-search-results'
        }
      >
        {searchResults
          ? searchResults.map((item, index) => (
              <List
                key={index}
                className={classes.root}
                component="nav"
                aria-label="mailbox folders"
              >
                <ListItem button>
                  <ListItemText primary={item.title} />
                  {item.backdrop_path ? (
                    <Avatar src={`${imageURL}${item.backdrop_path}`} />
                  ) : (
                    <Avatar alt="avatar" />
                  )}
                </ListItem>
                <Divider />
              </List>
            ))
          : ''}
      </div>
    );
  }
}

export default withStyles(styles)(SearchResults);
