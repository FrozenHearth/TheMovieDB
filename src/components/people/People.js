import React, { Component } from 'react';
import axios from 'axios';
import { castURL } from '../../utils/apiURLs';
import '../../styles/people/people.css';
import Sidebar from './peopleDetailsSidebar';
import Main from './Main';

class People extends Component {
  state = {
    castDetails: {},
    moviesKnownFor: []
  };
  componentDidMount() {
    axios
      .get(
        `${castURL}${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then(res => {
        this.setState(
          {
            castDetails: res.data
          },
          () => {
            if (this.state.castDetails.id) {
              axios
                .get(
                  `https://api.themoviedb.org/3/person/${this.state.castDetails.id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
                )
                .then(res =>
                  this.setState({
                    moviesKnownFor: res.data.cast.filter(
                      el => el.vote_average > 7.5
                    )
                  })
                );
            }
          }
        );
      });
  }
  render() {
    const { castDetails, moviesKnownFor } = this.state;
    return (
      <div className="person-details-container">
        {castDetails ? (
          <>
            <Sidebar castDetails={castDetails} />
            <Main castDetails={castDetails} moviesKnownFor={moviesKnownFor} />
          </>
        ) : null}
      </div>
    );
  }
}

export default People;
