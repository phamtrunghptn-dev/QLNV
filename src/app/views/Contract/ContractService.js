import axios from 'axios.js';
import { API } from 'app/constant';

const API_PATH = API + '/api/contracts';

export const getListContract = () => {
  return axios.get(API_PATH);
};
