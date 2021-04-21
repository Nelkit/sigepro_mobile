import { fetchJSON } from './api';
import {urlApi} from '../core/constants';

export default {
  async doLogin(email, password) {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Content-Type': 'application/json'
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/login/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
}