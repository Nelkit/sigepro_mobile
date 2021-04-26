import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { dbPath } from '../../core/constants';
import Colors from '../../core/colors';
import {
  Vehicle, 
  DistanceByWork, 
  HourByVehicle, 
  WorkOrder, 
  OrderProgress, 
  FuelControl, 
  TimeControl, 
  NonWorkingHours, 
  Month,
  VehicleDriver
} from '../../models';
import requests from '../../services/requests';
import LottieView from 'lottie-react-native';
import CardLayout from '../../components/CardLayout';
import SyncItem from '../../components/items/SyncItem';
let realm;

class Sync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueStatus: [],
      queueTotal: 3,
    };

    realm = new Realm({
      path: dbPath,
      schema: [
        Vehicle,
        DistanceByWork,
        HourByVehicle,
        WorkOrder,
        OrderProgress,
        FuelControl,
        TimeControl,
        NonWorkingHours,
        Month,
        VehicleDriver
      ],
      schemaVersion: 1,
      migration: function(oldRealm, newRealm) {

      },
    });
  }

  getWorkOrders() {
    var request = requests.getWorkOrders()
    request.then(work_orders => {
      work_orders.map((item, key)=>{
        realm.write(() => {
          realm.create(WorkOrder.name, item, true);
        });
      })
      this.pushToQueueStatus('Ordenes de trabajo');
    }).catch(error => {
      this.pushToQueueStatus('Ordenes de trabajo');
      console.log("RESPUESTA FALLIDA", error)
    })
  }

  getVehicles() {
    var request = requests.getVehicles()
    request.then(vehicles => {
      vehicles.map((item, key)=>{
        realm.write(() => {
          realm.create(Vehicle.name, item, true);
        });
      })
      this.pushToQueueStatus('Maquinaria de trabajo');
    }).catch(error => {
      this.pushToQueueStatus('Maquinaria de trabajo');
      console.log("RESPUESTA FALLIDA", error)
    })
  }

  getVehicleDrivers() {
    var request = requests.getVehicleDrivers()
    request.then(vehicle_drivers => {
      vehicle_drivers.map((item, key)=>{
        realm.write(() => {
          realm.create(VehicleDriver.name, item, true);
        });
      })
      this.pushToQueueStatus('Operadores de Maquinaria');
    }).catch(error => {
      this.pushToQueueStatus('Operadores de Maquinaria');
      console.log("RESPUESTA FALLIDA", error)
    })
  }

  uploadOrderProgress() {
    let progress = realm.objects(OrderProgress.name).filtered('isUploaded=false');

    progress.map((item)=>{
      var request = requests.uploadOrderProgress(item.project,item.vehicle,item.vehicle_driver, item.work_order)
      request.then(orderProgress => {
        realm.write(() => {
          item.isUploaded = true
          item.remoteId = orderProgress.id
        });
      }).catch(error => {
  
        console.log("RESPUESTA FALLIDA", error)
      })
    })
  }

  getAllData() {
    this.getVehicles();
    this.getVehicleDrivers();
    this.getWorkOrders();
    this.uploadOrderProgress();
  }

  pushToQueueStatus(title) {
    let queueStatus = [...this.state.queueStatus];

    // Add item to it
    queueStatus.push({title: title});

    // Set state
    this.setState({queueStatus});
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    this.getAllData();
  }

  render() {
    return (
      <View>
        <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.backgroundColor}
        />
        <ScrollView
          style={styles.scrollView}
          contentInsetAdjustmentBehavior="automatic">
            <CardLayout>
              {this.state.queueStatus.length < this.state.queueTotal && (
                <View style={styles.containerLoading}>
                  <LottieView
                    autoSize
                    style={styles.loading}
                    source={require('../../assets/lottieFiles/loading.json')}
                    autoPlay
                    loop
                  />
                </View>
              )}
              {this.state.queueStatus.length === this.state.queueTotal && (
                <View style={styles.containerCheck}>
                  <LottieView
                    autoSize
                    style={styles.check}
                    source={require('../../assets/lottieFiles/check.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={ this.navigateToHome }
                  />
                </View>
              )}
              <Text style={styles.title}>Espere un momento...</Text>
              <Text style={styles.subtitle}>
                La aplicación esta realizando una sincronización de los datos
                locales con el servidor solo tardara unos segundos
              </Text>
              <Text style={styles.title}>
                {this.state.queueStatus.length} de {this.state.queueTotal}
              </Text>
              {this.state.queueStatus.map((item, index)=>{
                return <SyncItem key={index} {...item} />
              })}
            </CardLayout>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.secondaryText,
    width: '100%',
    textAlign: 'center',
    padding: 20,
  },
  containerButton: {
    padding: 20,
  },
  containerLoading: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  containerCheck: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  loading: {
    width: 250,
    padding: 0,
  },
  check: {
    width: 450,
    padding: 0,
  },
});

export default Sync;
