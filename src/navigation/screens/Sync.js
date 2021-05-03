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
import SyncDownloadItem from '../../components/items/SyncDownloadItem';
import SyncUploadItem from '../../components/items/SyncUploadItem';

let realm;

class Sync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadQueue: [],
      downloadQueueTotal: 3,

      uploadQueue: [],
      orderProgressToUpload:[]
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
      schemaVersion: 2,
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
      this.pushToDownloadQueue('Ordenes de trabajo');
    }).catch(error => {
      this.pushToDownloadQueue('Ordenes de trabajo');
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
      this.pushToDownloadQueue('Maquinaria de trabajo');
    }).catch(error => {
      this.pushToDownloadQueue('Maquinaria de trabajo');
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
      this.pushToDownloadQueue('Operadores de maquinaria');
    }).catch(error => {
      this.pushToDownloadQueue('Operadores de maquinaria');
      console.log("RESPUESTA FALLIDA", error)
    })
  }

  uploadOrderProgress = () => {
    const { orderProgressToUpload } = this.state;

    orderProgressToUpload.map((item)=>{
      var request = requests.uploadOrderProgress(item.project,item.vehicle,item.vehicle_driver, item.work_order)
      request.then(order_progress => {
        realm.write(() => {
          item.isUploaded = true
          item.remoteId = order_progress.id
          
          item.time_controls.forEach(time_control => {time_control.project_progress = order_progress.id})
          item.fuel_controls.forEach(fuel_control => {fuel_control.project_progress = order_progress.id})
          item.non_working_hours.forEach(non_working_hour => {non_working_hour.project_progress = order_progress.id})
        });

        this.updateUploadedStatus(1)
        this.getAndUploadControls()
      }).catch(error => {
  
        console.log("RESPUESTA FALLIDA", error)
      })
    })

    if (orderProgressToUpload.length == 0){
      this.getAndUploadControls()
    }
  }

  uploadTimeControls = (timeControlsToUpload) => {
    timeControlsToUpload.map((item)=>{
      var request = requests.uploadTimeControls(item.project_progress, item.day, item.month, item.year, item.initial_hourmeter, item.hours, item.other_works, item.final_hourmeter)
      request.then(time_control => {
        realm.write(() => {
          item.isUploaded = true
          item.remoteId = time_control.id
        });

        this.updateUploadedStatus(2)
      }).catch(error => {
        console.log("ERROR AL GUARDAR TIME CONTROLS", error)
      })
    })
  }

  uploadFuelControls = (fuelControlsToUpload) => {
    fuelControlsToUpload.map((item)=>{
      var request = requests.uploadFuelControls(item.project_progress, item.day, item.month, item.year, item.quantity, item.price)
      request.then(fuel_control => {
        realm.write(() => {
          item.isUploaded = true
          item.remoteId = fuel_control.id
        });

        this.updateUploadedStatus(3)
      }).catch(error => {
        console.log("ERROR AL GUARDAR FUEL CONTROLS", error)
      })
    })
  }

  uploadNonWorkingHours = (nonWorkingHoursToUpload) => {
    nonWorkingHoursToUpload.map((item)=>{
      var request = requests.uploadNonWorkingHours(item.project_progress, item.day, item.month, item.year, item.reason, item.observations, item.hours, )
      request.then(non_working_hour => {
        realm.write(() => {
          item.isUploaded = true
          item.remoteId = non_working_hour.id
        });

        this.updateUploadedStatus(4)
      }).catch(error => {
        console.log("ERROR AL GUARDAR NON WORKING HOURS", error)
      })
    })
  }

  getAndUploadControls = () => {
    let orderProgressToUpload = realm.objects(OrderProgress.name).filtered('isUploaded=false');

    // si es igual a cero ya se subieron todos los OrderProgress
    if (orderProgressToUpload.length == 0){
      let uploadQueue = [...this.state.uploadQueue];
    
      let timeControlsToUpload = realm.objects(TimeControl.name).filtered('isUploaded=false');
      uploadQueue.push({id: 2, 'title': 'Control de horas', 'total': timeControlsToUpload.length, 'current': 0});
      this.uploadTimeControls(timeControlsToUpload)

      let fuelControlsToUpload = realm.objects(FuelControl.name).filtered('isUploaded=false');
      uploadQueue.push({id: 3, 'title': 'Control de combustible', 'total': fuelControlsToUpload.length, 'current': 0});
      this.uploadFuelControls(fuelControlsToUpload)

      let nonWorkingHoursToUpload = realm.objects(NonWorkingHours.name).filtered('isUploaded=false');
      uploadQueue.push({id: 4, 'title': 'Horas Inhabiles', 'total': nonWorkingHoursToUpload.length, 'current': 0});
      this.uploadNonWorkingHours(nonWorkingHoursToUpload)

      this.setState({uploadQueue});
    }

  }

  updateUploadedStatus = (id) => {
    let uploadQueue = [...this.state.uploadQueue];

    uploadQueue.filter(item => item.id == id)
    .forEach(item => item.current += 1)

    this.setState({uploadQueue});

    if (this.checkIfAllDataUploaded()){
      this.getAllData();
    }
  }

  getAllData() {
    this.getVehicles();
    this.getVehicleDrivers();
    this.getWorkOrders();
  }

  pushToDownloadQueue = (title) => {
    let downloadQueue = [...this.state.downloadQueue];

    // Add item to it
    downloadQueue.push({title: title});

    // Set state
    this.setState({downloadQueue});
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  getDataToUpload = (successCallback) => {
    let uploadQueue = [...this.state.uploadQueue];

    //Agregando OrderProgressQueue
    let orderProgressToUpload = realm.objects(OrderProgress.name).filtered('isUploaded=false');

    this.setState({orderProgressToUpload}, successCallback)
    uploadQueue.push({id: 1, 'title': 'Avance de ordenes', 'total': orderProgressToUpload.length, 'current': 0});

    // Set state
    this.setState({uploadQueue});
  }

  checkIfAllDataUploaded = () => {
    let orderProgressNotUploaded = realm.objects(OrderProgress.name).filtered('isUploaded=false');
    let timeControlsNotUploaded = realm.objects(TimeControl.name).filtered('isUploaded=false');
    let fuelControlsNotUploaded = realm.objects(FuelControl.name).filtered('isUploaded=false');
    let nonWorkingHoursNotUploaded = realm.objects(NonWorkingHours.name).filtered('isUploaded=false');

    return orderProgressNotUploaded.length == 0 && timeControlsNotUploaded.length == 0 && fuelControlsNotUploaded.length == 0 && nonWorkingHoursNotUploaded.length == 0
  }

  componentDidMount = () => {

    if (this.checkIfAllDataUploaded()){
      this.getAllData();
    }else{
      this.getDataToUpload(()=>{
        this.uploadOrderProgress();
      }); 
    }
  }

  render() {
    const {downloadQueue, downloadQueueTotal, uploadQueue} = this.state;

    return (
      <View>
        <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.backgroundColor}
        />
        <ScrollView
          style={styles.scrollView}
          contentInsetAdjustmentBehavior="automatic">
            <CardLayout>
              <View style={styles.cardBody}>
                {downloadQueue.length < downloadQueueTotal && (
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
                {downloadQueue.length === downloadQueueTotal && (
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
                <Text style={styles.description}>
                  La aplicación esta realizando una sincronización de los datos
                  locales con el servidor solo tardara unos segundos
                </Text>
                <View style={styles.panel}>
                  { uploadQueue.length > 0 && <Text style={styles.subtitle}>Subiendo </Text>}

                  {uploadQueue.map((item, index)=>{
                    return (
                      <SyncUploadItem 
                        key={index} 
                        title={item.title}
                        current={item.current}
                        total={item.total}
                        isFinished={item.current == item.total}
                      />
                    )
                  })}
                </View>
                <View style={styles.panel}>
                  <Text style={styles.subtitle}>
                    Descargando {downloadQueue.length} de {downloadQueueTotal}
                  </Text>
                  {downloadQueue.map((item, index)=>{
                    return <SyncDownloadItem key={index} {...item} />
                  })}
                </View>
              </View>
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
  cardBody: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
    width: '100%',
    textAlign: 'left',
  },
  description: {
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
    height: 150,
  },
  loading: {
    width: 200,
    padding: 0,
  },
  check: {
    width: 300,
    padding: 0,
  },
  panel:{
    paddingBottom: 15,
  }
});

export default Sync;
