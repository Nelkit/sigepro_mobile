import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CardLayout from '../components/CardLayout';
import MaterialButton from '../components/MaterialButton';
import Colors from '../core/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
let realm;

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      profileName: '',
      profileEmail: '',
    };
    //Bind Actions
    realm = new Realm({path: localDBPath});
  }

  signOutAsync = async () => {
    realm.write(() => {
      realm.schema.forEach(os => {
        let objs = realm.objects(os.name);
        realm.delete(objs);
      });
    });
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };

  goToSync = () => {
    realm.write(() => {
      realm.schema.forEach(os => {
        let objs = realm.objects(os.name);
        realm.delete(objs);
      });
    });
    this.props.navigation.navigate('Sync');
  };

  componentDidMount() {
    let query = realm.objects(Models.profile.name);

    //parseando a JSON
    var json = JSON.parse(JSON.stringify(query));

    //convirtiendo el JSON en un array
    var arrayData = Object.keys(json).map(function(_) {
      return json[_];
    });

    console.log(arrayData);

    for (var i in arrayData) {
      var item = arrayData[i];

      this.setState({profileName: item.first_name + ' ' + item.last_name});
      this.setState({profileUserName: item.username});
      this.setState({profileEmail: item.email});
    }
  }

  render() {

    return (
      <View style={styles.scene}>
        <CardLayout>
          <Text style={styles.header}>Datos Generales</Text>
          <View style={styles.body}>
            <View style={styles.verticalStack}>
              <Text>Usuario</Text>
              <Text style={styles.title}>{this.state.profileUserName}</Text>
            </View>
            {this.state.profileName.length > 0 && (
              <View style={styles.verticalStack}>
                <Text>Usuario</Text>
                <Text style={styles.title}>{this.state.profileName}</Text>
              </View>
            )}
            <View style={styles.verticalStack}>
              <Text>Correo</Text>
              <Text style={styles.title}>{this.state.profileEmail}</Text>
            </View>
            <View style={styles.verticalStack}>
              <MaterialButton
                title="CERRAR SESIÓN"
                backgroundColor={Colors.logoutColor}
                color={Colors.white}
                onPress={this.signOutAsync}
              />
            </View>
          </View>
        </CardLayout>
        <CardLayout>
          <Text style={styles.header}>Sincronización</Text>
          <View style={styles.body}>
            <View style={styles.verticalStack}>
              <MaterialButton
                title="Sincronizar Datos"
                backgroundColor={Colors.primaryColor}
                color={Colors.white}
                onPress={this.goToSync}
              />
            </View>
          </View>
        </CardLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: Colors.background,
    height: '100%',
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  containerButton: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalStack: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ProfileScreen;
