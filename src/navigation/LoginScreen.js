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
import Colors from '../core/colors';
import Helpers from '../core/helpers';
import LoginTextInput from '../components/LoginTextInput';
import MaterialButton from '../components/MaterialButton';
import Api from '../services/api';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorLogin: false,
      isLoading: false,
      disabled: false,
      env: 'staging',
    };

    this.doLogin = this.doLogin.bind(this);
  }

  async doLogin() {
    this.setState({isLoading: true});
    this.setState({disabled: true});
    this.setState({errorLogin: false});
    const {navigate} = this.props.navigation;

    var formData = new FormData();
    formData.append('username', this.state.username.toLowerCase());
    formData.append('password', this.state.password.toLowerCase());

    var response = await Api.doLogin(formData);
    if (response.data) {
      Helpers.storeData('token', response.data.token);
      navigate('Sync');
    } else {
      this.setState({errorLogin: true});
      console.log(response);
    }

    this.setState({isLoading: false});
    this.setState({disabled: false});
  }

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.container}>

                <Image
                  style={styles.logo}
                  source={require('../assets/images/logo.png')}
                />

                <View style={styles.formRow}>
                  <LoginTextInput
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    placeholder="Ingrese Usuario"
                  />
                </View>
                <View style={styles.formRow}>
                  <LoginTextInput
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    placeholder="Ingrese Contraseña"
                    secureTextEntry={true}
                  />
                </View>
                <MaterialButton
                  title="Entrar"
                  disabledText="Espere un Momento..."
                  disabled={this.state.disabled}
                  backgroundColor={Colors.primaryColor}
                  color={Colors.primaryDarkText}
                  onPress={this.doLogin}
                />
                {this.state.errorLogin && (
                  <Text style={styles.messageError}>
                    Ocurrio un error al hacer login, intente de nuevo.
                  </Text>
                )}

                {this.state.isLoading && (
                  <View style={styles.horizontal}>
                    <ActivityIndicator size="small" color="#0000ff" />
                  </View>
                )}
              </View>
            </ScrollView>
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
    width: 133,
    height: 131,
    marginBottom: 20,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  formRow: {
    width: '100%',
    marginBottom: 10,
  },
  messageError: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoginScreen;
