import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  LogBox,
} from 'react-native';
import Colors from '../../core/colors';
import AsyncStorage from '@react-native-community/async-storage';
import Helpers from '../../core/helpers';
import TextFont from '../../components/TextFont';
import MaterialButton from '../../components/MaterialButton';
import Divider from '../../components/Divider';
import { dbPath } from '../../core/constants';
import Realm from 'realm';
let realm;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    realm = new Realm({path: dbPath});
  }

  signOutAction = async () => {
    await AsyncStorage.clear();
    realm.write(() => {
      realm.deleteAll()
    });
    this.props.navigation.push('Auth');
  };

  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <View style={styles.boxHeader}>
              <TextFont fontSize={18} fontWeight={'bold'}>Perfil de Usuario</TextFont>
              <Divider/>
              <MaterialButton
                borderRadius={25}
                title="Sincronizar"
                backgroundColor={Colors.successColor}
                color={Colors.white}
                onPress={()=>this.props.navigation.push('Sync')}
              />
              <Divider/>
              <MaterialButton
                borderRadius={25}
                title="Cerrar Sesión"
                backgroundColor={Colors.logoutColor}
                color={Colors.white}
                onPress={this.signOutAction}
              />
            </View>
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
  boxHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical:20,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
});

export default Profile;
