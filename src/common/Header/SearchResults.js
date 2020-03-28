import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = {};

class SearchResults extends Component {
  render() {
    const { classes, searchResults } = this.props;
    console.log(searchResults);

    return (
      <Paper variant="outlined" style={{ width: '15em' }}>
        Hi bitch
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchResults);
