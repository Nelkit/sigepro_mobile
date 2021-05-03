import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import MaterialButton from '../../components/MaterialButton';
import DialogLayout from '../../components/DialogLayout';
import TextFont from '../../components/TextFont';
import PickerField from '../../components/PickerField';
import { Vehicle, VehicleDriver, OrderProgress, WorkOrder } from '../../models';
import Helpers from '../../core/helpers'
import { dbPath } from '../../core/constants';
import Realm from 'realm';
let realm;

class AddOrderProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [],
      selectedVehicle: {},
      vehicleDriverList: [],
      selectedVehicleDriver: {},
    };

    realm = new Realm({path: dbPath});
  }

  getVehicles(){ 
    let query = realm.objects(Vehicle.name);

    var vehicles = []
    query.map(function(item){
      vehicles.push({'label':item.title,'value':item.id, 'code':item.register_code,'subtitle':item.register_code})
    })

    this.setState({vehicleList: vehicles});
  }

  getVehicleDrivers(){
    let query = realm.objects(VehicleDriver.name);

    var vehicle_drivers = []
    query.map(function(item){
      vehicle_drivers.push({'label':`${item.first_name} ${item.last_name}`,'value':item.identity, 'subtitle':item.identity})
    })

    this.setState({vehicleDriverList: vehicle_drivers});
  }

  componentDidMount() {
    this.getVehicles()
    this.getVehicleDrivers()
  }

  saveNewOrderProgress = () => {
    const { params } = this.props.route
    const { selectedVehicle, selectedVehicleDriver } = this.state
    var nextID = Helpers.nextID(OrderProgress.name)
    const workOrder = realm.objectForPrimaryKey(WorkOrder.name, params.order_id);

    var newProgress = {
      id: nextID,
      project: params.project,
      vehicle: selectedVehicle.value,
      vehicle_code: selectedVehicle.code,
      vehicle_name: selectedVehicle.label,
      vehicle_driver: selectedVehicleDriver.value,
      vehicle_driver_name: selectedVehicleDriver.label,
      work_order: params.order_id,
      time_controls: [],
      fuel_controls: [],
      non_working_hours: [],
      months: [],
      isUploaded: false,
    };

    if (workOrder && selectedVehicle.value && selectedVehicleDriver.value){
      realm.write(() => {
        workOrder.order_progress.push(newProgress)
      });
      params.didAddOrderProgress()
      this.props.navigation.goBack()
    }else{
      console.log("Selecciona un vehiculo y operador para continuar")
    }
  }

  didVehicleSelected = (index) => {
    
    let selected = this.state.vehicleList[index]

    if (selected){
      this.setState({selectedVehicle: selected})
    }
  }

  didVehicleDriverSelected = (index) => {
    let selected = this.state.vehicleDriverList[index]

    if (selected){
      this.setState({selectedVehicleDriver: selected})
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route
    const { selectedVehicle, selectedVehicleDriver } = this.state
    console.log(params)

    return (
      <DialogLayout handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={10} paddingBottom={5}>Maquinaria</TextFont>
          <PickerField
            onPress={() => navigate('PickerView', {title:'Selecciona la maquinaria', list: this.state.vehicleList, didSelected: this.didVehicleSelected})}
            placeholder={'Selecciona la maquinaria'}
            value={selectedVehicle.label}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={10} paddingBottom={5}>Operador</TextFont>
          <PickerField
            onPress={() => navigate('PickerView', {title:'Selecciona el operador', list: this.state.vehicleDriverList, didSelected: this.didVehicleDriverSelected})}
            placeholder={'Selecciona el operador'}
            value={selectedVehicleDriver.label}
          />
        </View>
        <View style={{paddingTop: 20}}>
          <MaterialButton
            title="Guardar"
            disabledText="Espere un Momento..."
            uppercase={true}
            borderRadius={25}
            disabled={this.state.disabled}
            backgroundColor={Colors.primaryColor}
            color={Colors.primaryDarkText}
            onPress={this.saveNewOrderProgress}
          />
        </View>  
        <View style={{paddingTop: 10}}>
          <MaterialButton
            title="Cancelar"
            disabledText="Espere un Momento..."
            uppercase={true}
            borderRadius={25}
            disabled={this.state.disabled}
            backgroundColor={Colors.backgroundColor}
            color={Colors.primaryText}
            onPress={()=>this.props.navigation.goBack()}
          />
        </View>
      </DialogLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddOrderProgress;