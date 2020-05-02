import { combineReducers } from 'redux';

import popularMovies from '../reducers/popularMovies/reducer';

// import campgroundList from '../../components/campgrounds/reducers/campgroundReducers';
// import auth from '../../components/auth/reducers/authReducer';
// import payment from '../../components/campgrounds/reducers/paymentReducers';

export default combineReducers({
  popularMovies
  //   campgroundList,
  //   auth,
  //   payment
});
