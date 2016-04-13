
import {  SIGNIN,
          SIGNIN_SUCCESS,
          SIGNIN_FAILURE, }   from "../constants"
import * as authAPI           from "../api/authAPI"
import store                  from "../store"
import { redirectTo, logIt }        from "../utilities/helpers"
import { setUser }            from "./user"


const signinSuccess = (response) => {
  return {
    type:     SIGNIN_SUCCESS,
    response: response,
  }
}

const signinFailure = (response) => {
   return {
    type:           SIGNIN_FAILURE,
    response:       response,
    responseError:  response.data.message ?
                    response.data.message : "Something went wrong."
  }
}

const signin = ({ email, password }) => {
  authAPI
    .signin({ email, password })
    .then(response  => {
      store.dispatch(signinSuccess(response))
      store.dispatch(setUser(response))
      redirectTo("/dashboard")
    })
    .catch(response => {
      store.dispatch(signinFailure(response))
    })

  return {
    type: SIGNIN
  }
}


export default signin