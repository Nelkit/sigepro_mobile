import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import TextField from '../../components/TextField';
import MaterialButton from '../../components/MaterialButton';
import ModalLayout from '../../components/ModalLayout';
import Dropdown from '../../components/Dropdown';
import TextFont from '../../components/TextFont';
import { dbPath } from '../../core/constants';
import moment from 'moment';
import 'moment/locale/es';
import Realm from 'realm';
import { OrderProgress, NonWorkingHours } from '../../models';
let realm;

class AddNonWorkingHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      hours: 0,
      observations: '',
      reasonList: [
        {value:'D.M', label: 'Desperfectos Mecanicos'},
        {value:'O.D', label: 'Otros Desperfectos Mecanicos'},
        {value:'M.T', label: 'Mal Tiempo'},
        {value:'O.I', label: 'Otros Inhabiles'},
        {value:'E.M', label: 'Equipo Mantenimiento'},
      ]
    };

    realm = new Realm({path: dbPath});
  }

  saveNewNonWorkingHours = () => {
    const { params } = this.props.route
    const { reason, hours, observations, reasonList} = this.state

    var nextID = Helpers.nextID(NonWorkingHours.name)
    const orderProgress = realm.objectForPrimaryKey(OrderProgress.name, params.id);
    
    var today = new Date();
    var day = parseInt(moment().format('D'));
    var year = String(today.getFullYear());
    var month = Helpers.capitalizeFirstLetter(moment().format('MMMM'));
    var reason_str = ""

    var reasonFiltered = reasonList.filter((item)=>{ return item.value == reason  })
    if (reasonFiltered.length > 0){
      reason_str = reasonFiltered[0].label
    }

    var newNonWorkingHours = {
      id: nextID,
      project_progress: params.id,
      day: day,
      month: month,
      year: year,
      reason: reason,
      reason_str: reason_str,
      observations: observations,
      hours: parseInt(hours),
      isUploaded: false,
    }

    if (orderProgress){
      realm.write(() => {
        orderProgress.non_working_hours.push(newNonWorkingHours)
      });
      params.didAddProgressHandler()
      this.props.navigation.goBack()
    }else{
      console.log("No se encontro ningun progreso")
    }
        
  }

  render() {
    const { params } = this.props.route
    console.log(params)

    return (
      <ModalLayout title={'Registar Horas Inhabiles'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Razón</TextFont>
          <Dropdown
            onValueChange={ reason => this.setState({reason}) }
            placeholder={{label: 'Selecciona la razón', value: null}}
            items={this.state.reasonList}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horas</TextFont>
          <TextField
            onChangeText={hours => this.setState({hours})}
            value={this.state.hours}
            placeholder="Ingrese Horas"
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Observaciones</TextFont>
          <TextField
            onChangeText={observations => this.setState({observations})}
            value={this.state.observations}
            placeholder="Ingrese observaciones por la cual existio horas inhabiles"
          />
        </View>
        <View style={{paddingTop: 20}}>
          <MaterialButton
            title="Guardar"
            disabledText="Espere un Momento..."
            uppercase={true}
            disabled={this.state.disabled}
            borderRadius={25}
            backgroundColor={Colors.primaryColor}
            color={Colors.primaryDarkText}
            onPress={this.saveNewNonWorkingHours}
          />
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddNonWorkingHours;
