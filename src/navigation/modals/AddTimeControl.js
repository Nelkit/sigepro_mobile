import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import TextField from '../../components/TextField';
import MaterialButton from '../../components/MaterialButton';
import ErrorMessage from '../../components/ErrorMessage';
import ModalLayout from '../../components/ModalLayout';
import TextFont from '../../components/TextFont';
import { dbPath } from '../../core/constants';
import moment from 'moment';
import 'moment/locale/es';
import Realm from 'realm';
import { OrderProgress, TimeControl } from '../../models';
let realm;

class AddTimeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial_hourmeter: undefined,
      final_hourmeter: undefined,
      hours: 0,
      errorMessage: "",
    };

    realm = new Realm({path: dbPath});
  }

  saveNewTimeControl = () => {
    const { params } = this.props.route
    const { initial_hourmeter, final_hourmeter } = this.state

    if (initial_hourmeter == undefined){
      this.setState({errorMessage: "Asegurese que ingreso el horometro inicial"})
      return 
    }

    if (final_hourmeter == undefined ){
      this.setState({errorMessage: "Asegurese que ingreso el horometro final"})
      return 
    }
    
    var nextID = Helpers.nextID(TimeControl.name)
    const orderProgress = realm.objectForPrimaryKey(OrderProgress.name, params.id);
    
    var today = new Date();
    var day = parseInt(moment().format('D'));
    var year = String(today.getFullYear());
    var month = Helpers.capitalizeFirstLetter(moment().format('MMMM'));
    
    var hours = final_hourmeter - initial_hourmeter
    if (hours <= 0 || isNaN(parseInt(hours))){
      this.setState({errorMessage: "No se puede ingresar un horometro final menor que el inicial"})
      return
    }

    var newTimeControl = {
      id: nextID,
      project_progress: params.id,
      day: day,
      month: month,
      year: year,
      initial_hourmeter: parseInt(initial_hourmeter),
      hours: parseInt(hours),
      final_hourmeter: parseInt(final_hourmeter),
      is_uploaded: false,
    }

    if (orderProgress){
      realm.write(() => {
        orderProgress.time_controls.push(newTimeControl)
      });
      params.didAddProgressHandler()
      this.props.navigation.goBack()
    }else{
      console.log("No se encontro ningun progreso")
    }
  }

  initialHourmeterOnChange = (value) => {
    this.setState({errorMessage: ""})
    this.setState({initial_hourmeter: value})
    
    const { final_hourmeter } = this.state
    if (final_hourmeter && value) {
      console.log(final_hourmeter)
      this.setState({hours: parseInt(final_hourmeter) - parseInt(value)})
    }else{
      this.setState({hours: 0})
    }
  }

  finalHourmeterOnChange = (value) => {
    this.setState({errorMessage: ""})
    this.setState({final_hourmeter: value})
    
    const { initial_hourmeter } = this.state
    if (initial_hourmeter && value) {
      this.setState({hours: parseInt(value) - parseInt(initial_hourmeter)})
    }else{
      this.setState({hours: 0})
    }
  }

  render() {
    const { params } = this.props.route
    const { errorMessage } = this.state

    return (
      <ModalLayout title={'Registar Horas de Trabajo'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horometro Inicial</TextFont>
          <TextField
            onChangeText={this.initialHourmeterOnChange}
            value={this.state.initial_hourmeter}
            placeholder="Ingrese el horometro de la maquinaria"
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horometro Final</TextFont>
          <TextField
            onChangeText={this.finalHourmeterOnChange}
            value={this.state.final_hourmeter}
            placeholder="Ingrese el horometro de la maquinaria"
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Total de horas trabajadas</TextFont>
          <TextFont fontSize={16} paddingBottom={5}>{this.state.hours}Hrs</TextFont>
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
            borderRadius={25}
            disabled={this.state.disabled}
            backgroundColor={Colors.primaryColor}
            color={Colors.primaryDarkText}
            onPress={this.saveNewTimeControl}
          />
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddTimeControl;
