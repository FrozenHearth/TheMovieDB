import React, { Component } from 'react';

import Navbar from '../../../common/Header/Navbar';
import PersonsCard from './Card';
import '../../../styles/people/list/index.css';

export default class PersonsList extends Component {
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div className="person-card-container">
          <PersonsCard />
        </div>
      </>
    );
  }
}
