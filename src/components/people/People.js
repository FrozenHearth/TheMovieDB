import React, { Component } from 'react';
import axios from 'axios';
import { castURL } from '../../utils/apiURLs';

class People extends Component {
  componentDidMount() {
    axios
      .get(
        `${castURL}${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => console.log(res.data));

    axios
      .get(
        `https://api.themoviedb.org/3/person/${this.props.match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => console.log(res.data));
  }
  render() {
    return (
      <div>
        <span>Hi I am a person!</span>
      </div>
    );
  }
}

export default People;
