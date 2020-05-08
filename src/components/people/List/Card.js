import React, { Component } from 'react';
import { actionGetPopularPeople } from '../../../redux/actions/popularPeople/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { smImageURL } from '../../../utils/ImageURL';
import { Link } from 'react-router-dom';
import '../../../styles/people/list/card.css';
import { trunc } from '../../../utils/truncateString';
import Fallback from '../../../assets/images/fallback.png';

const styles = {
  personCard: {
    margin: '0 2em 3em 2em',
    width: '20em',
    position: 'relative',
    left: '13em',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '0'
  },
  primaryTitle: {
    fontSize: '1.8em',
    lineHeight: '1.1em',
    fontWeight: '600'
  }
};

class PersonsCard extends Component {
  state = {
    popularPeople: []
  };
  componentDidMount() {
    this.props.actionGetPopularPeople().then(res => {
      this.setState({
        popularPeople: res.results
      });
    });
  }
  render() {
    const { popularPeople } = this.state;
    const { classes } = this.props;
    return (
      <>
        {popularPeople
          ? popularPeople.map(person => (
              <Card className={classes.personCard} key={person.id}>
                <Link className={classes.btnLink} to={`/people/${person.id}`}>
                  <CardMedia>
                    {person.profile_path ? (
                      <img
                        className="person-card-media"
                        src={`${smImageURL}${person.profile_path}`}
                        alt="Person poster"
                      />
                    ) : (
                      <img
                        className="person-card-media"
                        src={`${Fallback}`}
                        alt="Person poster"
                      />
                    )}
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      className={classes.primaryTitle}
                      variant="h6"
                      component="h5"
                    >
                      {person.name}
                    </Typography>
                    <li className="supporting-text-list-container">
                      {person.known_for.slice(0, 3).map(el => (
                        <span className="supporting-text">
                          {el.name ? trunc(el.name, 30) : trunc(el.title, 30)}
                        </span>
                      ))}
                    </li>
                  </CardContent>
                </Link>
              </Card>
            ))
          : ''}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetPopularPeople
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(PersonsCard));
