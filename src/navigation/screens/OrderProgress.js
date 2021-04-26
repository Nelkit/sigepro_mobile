import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  LogBox,
  Image
} from 'react-native';
import Colors from '../../core/colors';
import TextFont from '../../components/TextFont';
import Divider from '../../components/Divider';
import MaterialButton from '../../components/MaterialButton';
import TimeControlItem from '../../components/items/TimeControlItem'
import FuelControlItem from '../../components/items/FuelControlItem'
import NonWorkingHourItem from '../../components/items/NonWorkingHourItem'

class OrderProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
      'VirtualizedLists should never be nested',
    ]);
  }

  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route
    console.log(params)
    const {vehicle_name, vehicle_driver_name, time_controls, fuel_controls, non_working_hours, months} = params;

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
        />
        <View style={styles.wrapper}>
          <View style={styles.boxHeader}>
            <TextFont fontSize={18}>
              <TextFont fontWeight={'bold'} style={styles.textbold}>Maquinaria: </TextFont>{vehicle_name}
            </TextFont>
            <Divider/>
            <TextFont fontSize={18}>
              <TextFont fontWeight={'bold'} style={styles.textbold}>Operador: </TextFont>{vehicle_driver_name}
            </TextFont>
          </View>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              {/* TimeControl */}
              {time_controls.length === 0 ? (
                <View style={styles.containerButton}>
                  <MaterialButton
                    title="REGISTRAR HORAS"
                    backgroundColor={Colors.successColor}
                    color={Colors.white}
                    height={120}
                    borderRadius={25}
                    uppercase={true}
                    onPress={()=>{navigate('AddTimeControl')}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_clock.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <TimeControlItem time_controls={time_controls} months={months} onPress={()=>{navigate('AddTimeControl')}}/>
              )}

              {/* FuelControl */}
              {fuel_controls.length === 0 ? (
                <View style={styles.containerButton}>
                  <MaterialButton
                    title="REGISTRAR COMBUSTIBLE"
                    backgroundColor={Colors.warningColor}
                    color={Colors.white}
                    height={120}
                    borderRadius={25}
                    uppercase={true}
                    onPress={()=>{navigate('AddFuelControl')}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_fuel.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <FuelControlItem fuel_controls={fuel_controls} months={months} onPress={()=>{navigate('AddFuelControl')}}/>
              )}

              {/* NonWorkingHours */}
              {non_working_hours.length === 0 ? (
                <View style={styles.containerButton}>
                  <MaterialButton
                    title="REGISTRAR HORAS INHABILES"
                    backgroundColor={Colors.dangerColor}
                    color={Colors.white}
                    height={120}
                    borderRadius={25}
                    uppercase={true}
                    onPress={()=>{navigate('AddNonWorkingHours')}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_non_working.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <NonWorkingHourItem non_working_hours={non_working_hours} months={months} onPress={()=>{navigate('AddNonWorkingHours')}}/>
              )}
          </ScrollView>
        </View>
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
    flex: 1,
  },
  boxHeader: {
    backgroundColor: Colors.white,
    padding: 20,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  containerButton:{
    marginHorizontal: 15,
    marginTop: 20,
  }
});

export default OrderProgress;
