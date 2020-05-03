import React, { Component } from 'react';

import Navbar from '../../../common/Header/Navbar';
import PersonsCard from './Card';

export default class PersonsList extends Component {
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div style={{ marginTop: '15em' }}>
          <PersonsCard />
        </div>
      </>
    );
  }
}
