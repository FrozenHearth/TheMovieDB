import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../../styles/header/searchResults.css';
import { imageURL } from '../../utils/ImageURL';

const styles = {
  root: {
    width: '100%',
    maxWidth: 355,
    padding: 0,
    color: '#000'
  },

  movieLink: {
    textDecoration: 'none'
  }
};

class SearchResults extends Component {
  getMediaType = mediaType => {
    if (mediaType === 'movie') {
      return 'in Movies';
    } else if (mediaType === 'tv') {
      return 'in TV Shows';
    } else if (mediaType === 'person') {
      return 'in People';
    }
  };
  render() {
    const { classes, searchResults, searchTerm, closeSearchResults } = this.props;
    console.log(searchResults);

    return (
      <div
        className={
          searchTerm !== '' && closeSearchResults === true
            ? 'search-results-wrapper'
            : 'hide-search-results'
        }
      >
        {searchResults && closeSearchResults
          ? searchResults.map((item, index) => (
              <Link key={index} className={classes.movieLink} to={`/movie/${item.id}`}>
                <List
                  onClick={() => this.props.closeSearchResultsDropdown()}
                  className={classes.root}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem className={classes.listItemHover} button>
                    <ListItemText
                      primary={item.title ? item.title : item.name}
                      secondary={this.getMediaType(item.media_type)}
                    />
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
