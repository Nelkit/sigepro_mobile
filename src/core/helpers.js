import moment from 'moment';
import 'moment/locale/es';
import Colors from './colors';
import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
import { dbPath } from '../core/constants';

export default {
  nextID(modelName) {
    realm = new Realm({path: dbPath});
    var nextId = 1
    let topId = realm.objects(modelName).max('id');
    if (topId) {
      nextId = topId + 1
    }
    return nextId
  },
  getRandomColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  },
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
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  },
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  groupBy(xs, key) {
    
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.title === v);
        if (el) {
            el.data.push(x);
        }
        else {
            rv.push({
                title: v,
                data: [x]
            });
        }
        return rv;
    }, []);
  },
  search(array, toSearch){
    var results = [];
    
    for(var i=0; i<array.length; i++) {
      for(var key in array[i]) {
        if(array[i]['label'].toLowerCase().indexOf(toSearch)!=-1) {
          results.push(array[i]);
        }
      }
    }

    return results;
  }

};