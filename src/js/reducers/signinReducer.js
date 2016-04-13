
import {  SIGNIN,
          SIGNIN_SUCCESS,
          SIGNIN_FAILURE, }  from "../constants";
import { authActions }       from "../actions";


const initialState = {
  waiting: false,
  response: null,
  responseError: "",
}

export default function signinReducer(state = initialState, action){
  switch (action.type){
  case SIGNIN: 
    return {
      ...state,
      response:       null,
      waiting:        true,
      responseError:  "",
    }
  case SIGNIN_SUCCESS:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  "",
    }
  case SIGNIN_FAILURE:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  action.responseError,
    }
  default:
    return state
  }
}