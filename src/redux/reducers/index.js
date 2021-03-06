import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import volunteer from './volunteerReducer';
import shift from './shiftReducer';
import session from './sessionReducer';
import message from './messageReducer';
import skill from './skillReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  volunteer, //will have information about all of the volunteers
  shift, //will have information relating to all the shifts
  session, //will relate to the sessions which we are dealing with
  message, //will have all of a user's current messages in their inbox
  skill,
});

export default rootReducer;
