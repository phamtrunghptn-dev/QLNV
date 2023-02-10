import axios from 'axios.js';
import { API } from 'app/constant';

const API_PATH = API + '/api/employees';

export const getListEmployee = () => {
  return axios.get(API_PATH);
};
