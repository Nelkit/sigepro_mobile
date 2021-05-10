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
import Realm from 'realm';
import { OrderProgress, FuelControl } from '../../models';
import moment from 'moment';
import 'moment/locale/es';
let realm;

class AddFuelControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: undefined,
      price: undefined,
      hourmeter: undefined,
      errorMessage: "",
    };

    realm = new Realm({path: dbPath});
  }

  saveNewFuelControl = () => {
    const { params } = this.props.route
    const { quantity, price, hourmeter} = this.state;

    if (quantity == undefined || isNaN(parseInt(quantity)) ){
      this.setState({errorMessage: "Asegurese que ingreso la cantidad"})
      return 
    }

    if (price == undefined || isNaN(parseInt(price)) ){
      this.setState({errorMessage: "Asegurese que ingreso el precio"})
      return 
    }

    var nextID = Helpers.nextID(FuelControl.name)
    const orderProgress = realm.objectForPrimaryKey(OrderProgress.name, params.id);

    var today = new Date();
    var day = parseInt(moment().format('D'));
    var year = String(today.getFullYear());
    var month = Helpers.capitalizeFirstLetter(moment().format('MMMM'));

    var newFuelControl = {
      id: nextID,
      project_progress: params.id,
      day: day,
      month: month,
      year: year,
      quantity: parseInt(quantity),
      price: price,
      is_uploaded: false,
    }

    if (orderProgress){
      realm.write(() => {
        orderProgress.fuel_controls.push(newFuelControl)
      });
      params.didAddProgressHandler()
      this.props.navigation.goBack()
    }else{
      console.log("No se encontro ningun progreso")
    }

  }

  render() {
    const { params } = this.props.route
    const { errorMessage } = this.state
    console.log(params)

    return (
      <ModalLayout title={'Registar Consumo de Combustible'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Cantidad cargada (gal)</TextFont>
          <TextField
            onChangeText={quantity => this.setState({quantity})}
            value={this.state.quantity}
            keyboardType={'numeric'}
            placeholder="Ingrese la cantidad de combustible"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Precio del combustible (L)</TextFont>
          <TextField
            onChangeText={price => this.setState({price})}
            value={this.state.price}
            keyboardType={'numeric'}
            placeholder="Ingrese precio del combustible"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horometro Llenado</TextFont>
          <TextField
            onChangeText={hourmeter => this.setState({hourmeter})}
            value={this.state.hourmeter}
            keyboardType={'numeric'}
            placeholder="Ingrese el horometro de la maquinaria"
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
            onPress={this.saveNewFuelControl}
          />
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddFuelControl;
