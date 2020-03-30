import React from 'react';
import { smImageURL } from '../../utils/ImageURL';
import moment from 'moment';

const Sidebar = props => {
  const { castDetails } = props;
  return (
    <aside className="person-details-sidebar">
      <div className="profile-image-container">
        <img
          className="profile-image"
          src={`${smImageURL}${castDetails.profile_path}`}
          alt=""
        />
      </div>
      <h1 className="personal-info"> Personal Info</h1>
      <div className="inner-content">
        <h1 className="inner-content-header">Known For </h1>
        <p className="inner-content-subtitle">
          {castDetails.known_for_department}
        </p>
        <h1 className="inner-content-header">Gender </h1>
        <p className="inner-content-subtitle">
          {castDetails.gender === 2 ? 'Male' : 'Female'}
        </p>
        <h1 className="inner-content-header">Birthday </h1>
        <p className="inner-content-subtitle">
          {moment(castDetails.birthday).format('DD/MM/YYYY')}
        </p>
        <h1 className="inner-content-header">Place Of Birth </h1>
        <p className="inner-content-subtitle">{castDetails.place_of_birth}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
