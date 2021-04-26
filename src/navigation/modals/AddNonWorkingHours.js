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

class AddNonWorkingHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ModalLayout title={'Registar Horas Inhabiles'} handleCloseModal={()=>this.props.navigation.goBack()}>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Razón</TextFont>
          <TextField
            onChangeText={username => this.setState({username})}
            value={this.state.username}
            placeholder="Ingrese el razón"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Horas</TextFont>
          <TextField
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            placeholder="Ingrese Horas"
          />
        </View>
        <View>
          <TextFont fontSize={16} fontWeight={'bold'} paddingTop={20} paddingBottom={5}>Observaciones</TextFont>
          <TextField
            onChangeText={password => this.setState({password})}
            value={this.state.password}
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
            onPress={this.doLogin}
          />
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({

});

export default AddNonWorkingHours;
