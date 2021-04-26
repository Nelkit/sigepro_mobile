import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../../core/colors';
import TextField from '../../components/TextField';
import MaterialButton from '../../components/MaterialButton';
import ModalLayout from '../../components/ModalLayout';
import TextFont from '../../components/TextFont';

class AddTimeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ModalLayout title={'Registar Horas de Trabajo'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horometro Inicial</TextFont>
          <TextField
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            placeholder="Ingrese el horometro de la maquinaria"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horometro Final</TextFont>
          <TextField
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            placeholder="Ingrese el horometro de la maquinaria"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Total de horas trabajadas</TextFont>
          <TextFont fontSize={16} paddingBottom={5}>20Hrs</TextFont>
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
            onPress={this.doLogin}
          />
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddTimeControl;
