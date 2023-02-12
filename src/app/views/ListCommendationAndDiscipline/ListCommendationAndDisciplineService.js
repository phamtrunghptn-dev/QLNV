import axios from 'axios.js';
import { API } from 'app/constant';

const API_PATH = API + '/api/commendation-and-disciplines';

export const getListCommendationAndDiscipline = () => {
  return axios.get(API_PATH);
};

export const editCommendationAndDiscipline = (obj) => {
  return axios.put(API_PATH + '/' + obj.id, obj);
};
