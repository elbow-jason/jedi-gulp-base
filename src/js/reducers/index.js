// reducers/index.js

import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';

import signinReducer              from './signinReducer';
import signupReducer              from './signupReducer';
import signoutReducer             from './signoutReducer';
import userReducer                from './userReducer';


const rootReducer = combineReducers({
  form:       formReducer,
  signin:     signinReducer,
  signup:     signupReducer,
  signout:    signoutReducer,
  user:       userReducer
});

export default rootReducer;