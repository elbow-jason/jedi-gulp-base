

import {  SET_ACTIVITIES,
          GET_ACTIVITIES,
          GET_ACTIVITIES_SUCCESS,
          GET_ACTIVITIES_FAILURE,  }  from "../constants"

import store                  from "../store"
import { redirectTo, logIt }        from "../utilities/helpers"

export const getActivitiesSuccess = (response) => {
  return logIt("GET_ACTIVITIES_SUCCESS" {
    type:     GET_ACTIVITIES_SUCCESS,
    response: response,
  })
}

export const getActivities = () => {
  return logIt("GET_ACTIVITIES", {
    type: GET_ACTIVITIES,
  })
}

export const setActivitiesSuccess = (response) => {
  return {
    type:     GET_ACTIVITIES_SUCCESS,
    response: response,
  }
}


