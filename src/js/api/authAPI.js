import axios from "axios";

window.axios = axios;

export const signout = () => {
  return axios.get(`/auth/signout`);
}

export const signin = (payload) => {
  return axios.post(`/auth/signin`, payload); // A promise
}

export const signup = (payload) => {
  return axios.post(`/auth/signup`, payload);
}
