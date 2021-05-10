import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import TextField from '../../components/TextField';
import TextBox from '../../components/TextBox';
import MaterialButton from '../../components/MaterialButton';
import ErrorMessage from '../../components/ErrorMessage';
import ModalLayout from '../../components/ModalLayout';
import PickerField from '../../components/PickerField';
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
      reasonSelected: {},
      hours: undefined,
      observations: '',
      reasonList: [
        {value:'D.M', label: 'Desperfectos Mecanicos'},
        {value:'O.D', label: 'Otros Desperfectos Mecanicos'},
        {value:'M.T', label: 'Mal Tiempo'},
        {value:'O.I', label: 'Otros Inhabiles'},
        {value:'E.M', label: 'Equipo Mantenimiento'},
      ],
      errorMessage: "",
    };

    realm = new Realm({path: dbPath});
  }

  saveNewNonWorkingHours = () => {
    const { params } = this.props.route
    const { reasonSelected, hours, observations} = this.state

    if (Object.getOwnPropertyNames(reasonSelected).length === 0){
      this.setState({errorMessage: "Asegurese que selecciono la razon"})
      return 
    }

    if (hours == undefined && hours == null && hours){
      this.setState({errorMessage: "Asegurese que ingreso las horas"})
      return 
    }

    var nextID = Helpers.nextID(NonWorkingHours.name)
    const orderProgress = realm.objectForPrimaryKey(OrderProgress.name, params.id);
    
    var today = new Date();
    var day = parseInt(moment().format('D'));
    var year = String(today.getFullYear());
    var month = Helpers.capitalizeFirstLetter(moment().format('MMMM'));

    if (isNaN(parseInt(hours))) {
      this.setState({errorMessage: "Asegurese que ingreso las horas"})
      return 
    }

    var newNonWorkingHours = {
      id: nextID,
      project_progress: params.id,
      day: day,
      month: month,
      year: year,
      reason: reasonSelected.value,
      reason_str: reasonSelected.label,
      observations: observations,
      hours: parseInt(hours),
      is_uploaded: false,
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

  didReasonSelected = (index) => {
    this.setState({errorMessage: ""})
    let selected = this.state.reasonList[index]

    if (selected){
      this.setState({reasonSelected: selected})
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route
    const { reasonList, reasonSelected, hours, observations, errorMessage } = this.state;
    console.log(params)

    return (
      <ModalLayout title={'Registar Horas Inhabiles'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Razón</TextFont>
          <PickerField
            onPress={() => navigate('PickerView', {title:'Selecciona la razón', list: reasonList, didSelected: this.didReasonSelected})}
            placeholder={'Selecciona la maquinaria'}
            value={reasonSelected.label}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horas</TextFont>
          <TextField
            onChangeText={hours => this.setState({hours})}
            value={hours}
            placeholder="Ingrese Horas"
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Observaciones</TextFont>
          <TextBox
            onChangeText={observations => this.setState({observations})}
            value={observations}
            placeholder="Ingrese observaciones por la cual existio horas inhabiles"
          />
        </View>
        <View>
          {errorMessage.length > 0 &&(
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
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
