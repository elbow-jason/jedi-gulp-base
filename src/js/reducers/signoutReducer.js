
import {  SIGNOUT,
          SIGNOUT_SUCCESS,
          SIGNOUT_FAILURE, }  from "../constants";
import { authActions }        from "../actions";


const initialState = {
  waiting: false,
  response: null,
  responseError: "",
}

export default function signoutReducer(state = initialState, action){
  switch (action.type){
  case SIGNOUT: 
    return {
      ...state,
      response:       null,
      waiting:        true,
      responseError:  "",
    }
  case SIGNOUT_SUCCESS:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  "",
    }
  case SIGNOUT_FAILURE:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  action.responseError,
    }
  default:
    return state;
  }
}