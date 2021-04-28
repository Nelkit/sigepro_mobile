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
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import { FuelControl, NonWorkingHours, TimeControl } from '../../models';
let realm;

class OrderProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time_controls: [],
      fuel_controls: [],
      non_working_hours: [],
    };

    realm = new Realm({path: dbPath});    
  }

  getProgressData = () =>{
    const { params } = this.props.route
    const { id } = params;

    let timeControls = realm.objects(TimeControl.name).filtered(`project_progress = ${id}`);
    this.setState({time_controls: timeControls})

    let fuelControls = realm.objects(FuelControl.name).filtered(`project_progress = ${id}`);
    this.setState({fuel_controls: fuelControls})

    let nonWorkingHours = realm.objects(NonWorkingHours.name).filtered(`project_progress = ${id}`);
    this.setState({non_working_hours: nonWorkingHours})
  }

  componentDidMount() {
    this.getProgressData()
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
      'VirtualizedLists should never be nested',
    ]);
  }

  didAddProgressHandler = () => {
    this.getProgressData()
  };


  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route
    const { time_controls, fuel_controls, non_working_hours } = this.state;
    console.log(params)
    const {id, vehicle_name, vehicle_driver_name, months} = params;

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
                    onPress={()=>{navigate('AddTimeControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_clock.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <TimeControlItem time_controls={time_controls} months={months} onPress={()=>{navigate('AddTimeControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}/>
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
                    onPress={()=>{navigate('AddFuelControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_fuel.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <FuelControlItem fuel_controls={fuel_controls} months={months} onPress={()=>{navigate('AddFuelControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}/>
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
                    onPress={()=>{navigate('AddNonWorkingHours', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                  >          
                    <Image
                      style={styles.icon}
                      source={require('../../assets/images/icons/ic_non_working.png')}
                      />
                  </MaterialButton>
                </View>
              ):(
                <NonWorkingHourItem non_working_hours={non_working_hours} months={months} onPress={()=>{navigate('AddNonWorkingHours', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}/>
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
