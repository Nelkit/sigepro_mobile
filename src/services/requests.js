import { fetchJSON } from './api';
import {urlApi} from '../core/constants';
import AsyncStorage from '@react-native-community/async-storage';

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
  async getWorkOrders() {
    const token = await AsyncStorage.getItem('token');

    const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/work_orders/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
}