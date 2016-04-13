
import {  SIGNUP,
          SIGNUP_SUCCESS,
          SIGNUP_FAILURE, }  from "../constants";
import { authActions }       from "../actions";

const initialState = {
  waiting: false,
  response: null,
  responseError: "",
}

export default function signupReducer(state = initialState, action){
  switch (action.type){
  case SIGNUP: 
    return {
      ...state,
      response:       null,
      waiting:        true,
      responseError:  "",
    } 
  case SIGNUP_SUCCESS:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  "",
    }
  case SIGNUP_FAILURE:
    return {
      ...state,
      response:       action.response,
      waiting:        false,
      responseError:  action.responseError || "Something went wrong",
    }
  default:
    return state;
  }
}