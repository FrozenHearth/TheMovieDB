import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/movies/movieCast.css';
import { smImageURL, imageURL } from '../../../utils/ImageURL';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  personCard: {
    marginRight: '2em'
  },
  movieCastName: {
    fontWeight: 900,
    fontSize: '1.6em'
  }
};

const MovieCast = props => {
  const { credits, classes } = props;
  console.log(credits.cast);
  return (
    <>
      <h2 className="cast-details-title">Top Billed Cast </h2>
      <div className="cast-details-wrapper">
        {credits.cast
          ? credits.cast.slice(0, 8).map((item, index) => (
              <li
                style={
                  item.profile_path ? { display: 'block' } : { display: 'none' }
                }
                key={item.id}
                className="cast-image-container"
              >
                {item.profile_path ? (
                  <Link to={`/person/${item.id}`}>
                    <img
                      className="cast-image"
                      src={`${smImageURL}${item.profile_path}`}
                      alt=""
                    />
                  </Link>
                ) : null}
                <div className="cast-details-bottom">
                  <p className="cast-title">{item.name}</p>
                  <p className="cast-character">{item.character}</p>
                </div>
              </li>
            ))
          : ''}
      </div>
    </>
  );
};

export default withStyles(styles)(MovieCast);