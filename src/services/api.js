import axios from 'axios';
import {urlApi} from '../core/constants';

export default {
  doLogin(data) {
    return axios
      .post(urlApi + '/api-token-auth/', data)
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
  getSummaryChartData(token) {
    return axios
      .get(urlApi + '/api/resumen_graficos/', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getSummaryChartData()');
      });
  },
  getFideicomisosData(token) {
    return axios
      .get(urlApi + '/api/tipos_fideicomiso/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getFideicomisosData()');
      });
  },
  getProfile(token) {
    return axios
      .get(urlApi + '/api/profile/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getProfile()');
      });
  },
  getFideicomisoDetailData(typePath, search, token) {
    return axios
      .get(urlApi + '/api/' + typePath + '/?search=' + search, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getFideicomisoDetailData()');
      });
  },
  getFideicomisoProgramsData(typePath, idFideicomiso, token) {
    return axios
      .get(urlApi + '/api/' + typePath + '/' + idFideicomiso + '/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        console.log(urlApi + '/api/' + typePath + '/' + idFideicomiso + '/');
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getFideicomisoProgramsData()');
      });
  },
  getFideicomisoComponentsData(typePath, token) {
    return axios
      .get(urlApi + '/api/' + typePath + '/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        console.log(urlApi + '/api/' + typePath + '/');
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getFideicomisoComponentsData()');
      });
  },
  getMacros(token) {
    return axios
      .get(urlApi + '/api/macros_economicos/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getMacros()');
      });
  },
  getSefinDatos(token) {
    return axios
      .get(urlApi + '/api/sefin_datos/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getMacros()');
      });
  },
  getSectoresIndicadoresDatos(token) {
    return axios
      .get(urlApi + '/api/sectores_de_indicadores/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getSectoresIndicadoresDatos()');
      });
  },
  getSectores(token) {
    return axios
      .get(urlApi + '/api/sectores/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getSectores()');
      });
  },
  getIndicadores(token) {
    return axios
      .get(urlApi + '/api/indicadores/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getIndicadores()');
      });
  },
  getAvances(token) {
    return axios
      .get(urlApi + '/api/avances/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getAvances()');
      });
  },
  getSetting(token) {
    return axios
      .get(urlApi + '/api/setting/')
      .then(response => {
        // handle success
        var responseData = [];
        if (response.data) {
          responseData = response.data;
        }
        return responseData;
      })
      .catch(error => {
        // handle error
        return error;
      })
      .finally(() => {
        // always executed
        console.log('complete getSetting()');
      });
  },
};
