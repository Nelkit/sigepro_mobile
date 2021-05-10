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
  Image,
  Dimensions
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../../core/colors';
import TextFont from '../../components/TextFont';
import Divider from '../../components/Divider';
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
      index: 0,
      routes: [
        {key: 'first', title: 'Horas'},
        {key: 'second', title: 'Combustible'},
        {key: 'third', title: 'Horas inhabiles'},
      ],
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
    const {id, vehicle_name, vehicle_driver_name, order_status } = params;

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
            <View style={styles.divider} />
          </View>
          <TabView
            swipeEnabled={true}
            navigationState={this.state}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  return (
                    <TimeControlItem 
                      order_status={order_status}
                      time_controls={time_controls} 
                      onPress={()=>{navigate('AddTimeControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                    />
                  )
                case 'second':
                  return( 
                    <FuelControlItem 
                      order_status={order_status}
                      fuel_controls={fuel_controls}
                      onPress={()=>{navigate('AddFuelControl', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                    />
                  )
                case 'third':
                  return (
                    <NonWorkingHourItem 
                      order_status={order_status}
                      non_working_hours={non_working_hours} 
                      onPress={()=>{navigate('AddNonWorkingHours', {id: id, didAddProgressHandler: this.didAddProgressHandler})}}
                    />
                  );
                default:
                  return null;
              }
            }}
            renderTabBar={props => (
              <TabBar
                {...props}
                activeColor={Colors.primaryColor}
                inactiveColor={Colors.secondaryText}
                indicatorStyle={{backgroundColor: Colors.secondaryColor, height: 5}}
                style={{backgroundColor: Colors.white}}
                scrollEnabled={false}
              />
            )}
            onIndexChange={index => this.setState({index})}
            initialLayout={{width: Dimensions.get('window').width}}
          />
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  },
  divider: {
    marginTop: 15,
    backgroundColor: "#F2F2F2",
    height: 2,
    width: "100%"
  }
});

export default OrderProgress;
