import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import MaterialButton from '../../components/MaterialButton';
import DialogLayout from '../../components/DialogLayout';
import TextFont from '../../components/TextFont';
import Dropdown from '../../components/Dropdown';
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
      vehicles.push({'label':item.title,'value':item.id, 'code':item.register_code})
    })

    this.setState({vehicleList: vehicles});
  }

  getVehicleDrivers(){
    let query = realm.objects(VehicleDriver.name);

    var vehicle_drivers = []
    query.map(function(item){
      vehicle_drivers.push({'label':`${item.first_name} ${item.last_name}`,'value':item.identity})
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

  onVehicleDropdownChange = (value) => {
    let filterResults = this.state.vehicleList.filter(function (item) {
      return item.value == value;
    })

    if (filterResults.length > 0){
      var selected  = filterResults[0]
      this.setState({selectedVehicle: selected})
    }
  }

  onVehicleDriverDropdownChange = (value) => {
    let filterResults = this.state.vehicleDriverList.filter(function (item) {
      return item.value == value;
    })

    if (filterResults.length > 0){
      var selected  = filterResults[0]
      this.setState({selectedVehicleDriver: selected})
    }
  }

  render() {
    const { params } = this.props.route
    console.log(params)

    return (
      <DialogLayout handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={10} paddingBottom={5}>Maquinaria</TextFont>
          <Dropdown
            onValueChange={this.onVehicleDropdownChange}
            placeholder={{label: 'Selecciona la maquinaria', value: null}}
            items={this.state.vehicleList}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={10} paddingBottom={5}>Operador</TextFont>
          <Dropdown
            onValueChange={this.onVehicleDriverDropdownChange}
            placeholder={{label: 'Selecciona el operador', value: null}}
            items={this.state.vehicleDriverList}
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