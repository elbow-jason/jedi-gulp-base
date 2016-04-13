
import {  SIGNOUT,
          SIGNOUT_SUCCESS,
          SIGNOUT_FAILURE, }  from "../constants"
import * as authAPI           from "../api/authAPI"
import store                  from "../store"
import { redirectTo, logIt }        from "../utilities/helpers"
import { clearUser }          from "./user"


const reloadHomePage = () => {
  window.location.hash = "/"
}

const signoutSuccess = (response) => {
  setTimeout(reloadHomePage, 2500);
  return {
    type:     SIGNOUT_SUCCESS,
    response: response,
  }
}

const signoutFailure = (response) => {
   return {
    type:           SIGNOUT_FAILURE,
    response:       response,
    responseError:  response.data.message ?
                    response.data.message : "Something went wrong."
  }
}

const signout = ({ email, password }) => {
  authAPI
    .signout({ email, password })
    .then(response  => {
      store.dispatch(signoutSuccess(response))
      store.dispatch(clearUser())
      redirectTo("/signout")
    })
    .catch(response => {
      store.dispatch(signoutFailure(response))
    })

  return {
    type: SIGNOUT
  }
}

export default signout
