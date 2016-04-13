
import {  SIGNUP,
          SIGNUP_SUCCESS,
          SIGNUP_FAILURE,  }  from "../constants"
import * as authAPI           from "../api/authAPI"
import store                  from "../store"
import { redirectTo, logIt }  from "../utilities/helpers"

const signupSuccess = (response) => {
  return {
    type:     SIGNUP_SUCCESS,
    response: response,
  }
}

const signupFailure = (response) => {
   return {
    type:           SIGNUP_FAILURE,
    response:       response,
    responseError:  response.data ?
                    response.data.message : "Something went wrong."
  } 
}

const signup = ({ email, password }) => {
  authAPI
    .signup({ email, password })
    .then(response  => {
      store.dispatch(signupSuccess(response))
      redirectTo("/signin")
    })
    .catch(response => {
      store.dispatch(signupFailure(response))
    })

  return { type: SIGNUP }
}

export default signup