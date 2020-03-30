import React, { Component } from 'react';
import axios from 'axios';
import { castURL } from '../../utils/apiURLs';
import '../../styles/people/peopleDetails.css';
import Sidebar from './peopleDetailsSidebar';

class People extends Component {
  state = {
    castDetails: {}
  };
  componentDidMount() {
    axios
      .get(
        `${castURL}${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => this.setState({ castDetails: res.data }));
  }
  render() {
    const { castDetails } = this.state;
    console.log(castDetails);
    return (
      <div className="person-details-container">
        {castDetails ? <Sidebar castDetails={castDetails} /> : null}
      </div>
    );
  }
}

export default People;
