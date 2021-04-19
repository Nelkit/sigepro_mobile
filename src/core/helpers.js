import moment from 'moment';
import 'moment/locale/es';
import Colors from './colors';
import AsyncStorage from '@react-native-community/async-storage';

export default {
  getDateFromNow(date) {
    var localLocale = moment(date);
    moment.locale('es');
    localLocale.locale(false);
    return localLocale.fromNow();
  },
  getDDMMYYYY(date) {
    var localLocale = moment(date);
    moment.locale('es');
    localLocale.locale(false);
    return localLocale.format('DD-MMMM-YYYY');
  },
  getMM(date) {
    var localLocale = moment(date);
    moment.locale('es');
    localLocale.locale(false);
    return localLocale.format('MMM YY');
  },
  getMMYYYY(date) {
    var localLocale = moment(date);
    moment.locale('es');
    localLocale.locale(false);
    return localLocale.format('MMM YYYY');
  },
  colorByPercentage(liquidado) {
    if (liquidado < 50) {
      return Colors.reprobado;
    } else if (liquidado >= 50 && liquidado < 70) {
      return Colors.aprobado;
    } else if (liquidado >= 70 && liquidado < 90) {
      return Colors.excelente;
    } else if (liquidado >= 90) {
      return Colors.sobresaliente;
    }
  },
  daysBetween(date1, date2) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  },
  fixedTo(number) {
    var num = number;
    var n = parseFloat(num).toFixed(2);
    return n
  },
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  },
};
