import axios from 'axios.js';
import { API } from 'app/constant';

const API_PATH = API + '/api/timekeepings';
const API_PATH2 = API + '/api/employees';

export const getListTimeKeeping = (searchObject) => {
  return axios.post(API_PATH + '/searchByDto', searchObject);
};

export const getListEmployee = () => {
  return axios.get(API_PATH2);
};

export const deleteListTimeKeeping = (id) => {
  return axios.delete(API_PATH + '/' + id);
};
