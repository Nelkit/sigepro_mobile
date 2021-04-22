import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
} from 'react-native';
import Colors from '../core/colors';
import MaterialButton from '../components/MaterialButton'
import AsyncStorage from '@react-native-community/async-storage';

class TabCompleted extends React.Component {
  constructor(props) {
    super(props);
  }

  signOutAction = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <SafeAreaView>
      <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.scene}>
            <Text>TAB3 </Text>  
            <MaterialButton
                title="CERRAR SESIÓN"
                backgroundColor={Colors.logoutColor}
                color={Colors.white}
                onPress={this.signOutAction}
              />
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingBottom: 22,
  },
  scene: {
    backgroundColor: "#ffffff",
    height: '100%',
  },
});

export default TabCompleted;