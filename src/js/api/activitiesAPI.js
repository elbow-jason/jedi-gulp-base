
import axios from "axios";

export const getActivities = () => {
  return axios.get('/activities');
}
