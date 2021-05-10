import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import TextField from '../../components/TextField';
import MaterialButton from '../../components/MaterialButton';
import ErrorMessage from '../../components/ErrorMessage';
import requests from '../../services/requests'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextFont from '../../components/TextFont';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      errorLogin: false,
      isLoading: false,
      disabled: false,
      env: 'staging',
    };

    this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    this.setState({isLoading: true});
    this.setState({disabled: true});
    this.setState({errorLogin: false});
    const {navigate, push} = this.props.navigation;

    var login = requests.doLogin(
      this.state.username, 
      this.state.password
    )

    login.then(response => {
      Helpers.storeData('token',response.access_token)
      push('Root');

      this.setState({isLoading: false});
      this.setState({disabled: false});
    }).catch(error => {
      this.setState({errorLogin: true});
      console.log("RESPUESTA FALLIDA", error)

      this.setState({errorMessage: error})
      this.setState({isLoading: false});
      this.setState({disabled: false});
    })

    handleKeyDown = (event) => {
      if(event.nativeEvent.key == "Enter"){
          dismissKeyboard();
      }
    }

  }

  render() {
    const {message} = this.state.errorMessage;
    var errorMessage = "";
    if (message){
      var messageJson = JSON.parse(message)
      if (messageJson.email){
        errorMessage = `Email: ${messageJson.email[0]}`
      }
      
      if (messageJson.password){
        errorMessage = `Contraseña: ${messageJson.password[0]}`
      }

      if (messageJson.non_field_errors){
        errorMessage = `${messageJson.non_field_errors[0]}`
      }
    }

    return (
      <>
        <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <KeyboardAwareScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
              <View style={styles.container}>

                <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo.png')}
                />

                <View style={styles.formRow}>
                  <TextField
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    placeholder="Ingrese correo electrónico"
                  />
                </View>
                <View style={styles.formRow}>
                  <TextField
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    placeholder="Ingrese contraseña"
                    secureTextEntry={true}
                    returnKeyType="done"
                    onKeyPress={this.handleKeyDown}
                  />
                </View>
                <View style={styles.containerButton}>
                  <MaterialButton
                    title="Entrar"
                    disabledText="Espere un Momento..."
                    borderRadius={25}
                    uppercase={true}
                    disabled={this.state.disabled}
                    backgroundColor={Colors.primaryColor}
                    color={Colors.primaryDarkText}
                    onPress={this.doLogin}
                  />
                </View>
                {this.state.errorLogin && (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                )}

                {this.state.isLoading && (
                  <View style={styles.horizontal}>
                    <ActivityIndicator size="small" color={Colors.primaryColor} />
                  </View>
                )}
              </View>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: Colors.background,
  },
  scrollView: {
    height: '100%',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    width: 140,
    height: 152,
    marginVertical: 40,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  formRow: {
    width: '100%',
    marginBottom: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  containerButton:{
    marginTop: 20,
  }
});

export default Login;
