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
  async getVehicles() {
    const token = await AsyncStorage.getItem('token');

    const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/vehicles/?page_size=1000`, options)
      return response.results
    } catch (error) {
      throw error
    }
  },
  async getVehicleDrivers() {
    const token = await AsyncStorage.getItem('token');

    const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/vehicle_drivers/?page_size=1000`, options)
      return response.results
    } catch (error) {
      throw error
    }
  },
  async uploadOrderProgress(project, vehicle, vehicle_driver, work_order) {
    const token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    console.log(`${project} ${vehicle} ${vehicle_driver} ${work_order}`)
    formData.append('project', project);
    formData.append('vehicle', vehicle);
    formData.append('vehicle_driver', vehicle_driver);
    formData.append('work_order', work_order);
    formData.append('active', true);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/project_progress/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
}