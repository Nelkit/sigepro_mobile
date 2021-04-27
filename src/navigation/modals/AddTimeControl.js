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
import TextFont from '../../components/TextFont';
import { dbPath } from '../../core/constants';
import moment from 'moment';
import 'moment/locale/es';
import Realm from 'realm';
import { Month, OrderProgress, TimeControl } from '../../models';
let realm;

class AddTimeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial_hourmeter: 0,
      final_hourmeter: 0,
      hours: 0,
    };

    realm = new Realm({path: dbPath});
  }

  saveNewTimeControl = () => {
    const { params } = this.props.route
    const { initial_hourmeter, final_hourmeter } = this.state
    var nextID = Helpers.nextID(TimeControl.name)
    const orderProgress = realm.objectForPrimaryKey(OrderProgress.name, params.id);
    var today = new Date();
    var day = parseInt(moment().format('D'));
    var year = String(today.getFullYear());
    var month = Helpers.capitalizeFirstLetter(moment().format('MMMM'));
    
    var hours = final_hourmeter - initial_hourmeter
    var newTimeControl = {
      id: nextID,
      project_progress: params.id,
      day: day,
      month: month,
      year: year,
      initial_hourmeter: parseInt(initial_hourmeter),
      hours: parseInt(hours),
      final_hourmeter: parseInt(final_hourmeter),
    }

    if (orderProgress){
      realm.write(() => {
        orderProgress.time_controls.push(newTimeControl)
      });
      params.didAddTimeControl()
      this.props.navigation.goBack()
    }else{
      console.log("No se encontro ningun progreso")
    }
  }

  initialHourmeterOnChange = (value) => {
    this.setState({initial_hourmeter: value})
    
    const { initial_hourmeter, final_hourmeter } = this.state
    this.setState({hours: parseInt(final_hourmeter) - parseInt(value)})
  }

  finalHourmeterOnChange = (value) => {
    this.setState({final_hourmeter: value})
    
    const { initial_hourmeter, final_hourmeter } = this.state
    this.setState({hours: parseInt(value) - parseInt(initial_hourmeter)})
  }

  render() {
    const { params } = this.props.route
    console.log(params)

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
