
import {  SET_USER,
          CLEAR_USER,   }     from "../constants"
import { redirectTo, logIt }  from "../utilities/helpers"

export const setUser = (response) => {
  return logIt("setUser called", {
    type: SET_USER,
    user: response.data,  // user is the data
  })
}

export const clearUser = () => {
   return logIt("clearUser called", {
    type: CLEAR_USER,
  })
}
