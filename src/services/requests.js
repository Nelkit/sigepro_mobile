import { fetchJSON } from './api';
import {urlApi} from '../core/constants';
import AsyncStorage from '@react-native-community/async-storage';

export default {
  async doLogin(email, password) {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    console.log(email, password)
    
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
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
  async updateWorkOrderStatus(id, new_status) {
    const token = await AsyncStorage.getItem('token');

    var formData = new FormData();
    formData.append('status', new_status);

    const options = {
      method: 'PATCH',
      body: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/work_orders/${id}/`, options)
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
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
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
  async uploadTimeControls(
    project_progress,
    day,
    month,
    year,
    initial_hourmeter,
    hours,
    other_works,
    final_hourmeter,
  ) {
    const token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    formData.append('project_progress', project_progress);
    formData.append('day', day);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('initial_hourmeter', initial_hourmeter);
    formData.append('hours', hours);
    formData.append('other_works', other_works);
    formData.append('final_hourmeter', final_hourmeter);
    formData.append('active', true);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/time_controls/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
  async uploadFuelControls(
    project_progress,
    day,
    month,
    year,
    quantity,
    price,
  ) {
    const token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    formData.append('project_progress', project_progress);
    formData.append('day', day);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('active', true);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/fuel_controls/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
  async uploadNonWorkingHours(
    project_progress,
    day,
    month,
    year,
    reason,
    observations,
    hours
  ) {
    const token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    formData.append('project_progress', project_progress);
    formData.append('day', day);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('reason', reason);
    formData.append('observations', observations);
    formData.append('hours', hours);
    formData.append('active', true);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
      },
    };

    try {
      var response = await fetchJSON(`${urlApi}/api/mobile/non_working_hours/`, options)
      return response
    } catch (error) {
      throw error
    }
  },
}