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
    maxWidth: 380,
    padding: 0,
    color: '#000'
  },

  movieLink: {
    textDecoration: 'none'
  }
};

class SearchResults extends Component {
  state = {
    closeSearchResults: true
  };
  closeSearchResults = () => {
    this.setState({
      closeSearchResults: !this.state.closeSearchResults
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
        {searchResults && closeSearchResults
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
