import axios from 'axios.js';
import { API } from 'app/constant';

const API_PATH = API + '/api/employees/get-certification-percentage';
const API_PATH2 = API + '/api/payment-salarys/calculate-total-salary-by-month';

export const getCertificationPercentage = () => {
  return axios.get(API_PATH);
};

export const getSalaryCalculateTotalSalaryByMonth = () => {
  return axios.get(API_PATH2);
};
