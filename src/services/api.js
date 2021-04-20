import axios from 'axios';
import {urlApi} from '../core/constants';

export default {
  doLogin(data) {
    return axios
      .post(urlApi + '/login/', data)
      .then(response => {
        // handle success
        return response;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete doLogin()');
      });
  },
};