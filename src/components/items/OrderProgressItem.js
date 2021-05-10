import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Divider from '../Divider'
import TextFont from '../TextFont'
import PropTypes from 'prop-types'
import StatusPill from '../StatusPill'

const VehicleIcon = ({ vehicle_name }) => {
  var vehicle_name = vehicle_name.toLowerCase()
  if (vehicle_name.includes("volqueta")){
    return (
      <Image style={styles.icon} source={require('../../assets/images/machineries/ic_dump.png')}/> 
    )
  }else if (vehicle_name.includes("cisterna")){
    return (
      <Image style={styles.icon} source={require('../../assets/images/machineries/ic_tank.png')}/> 
    )
  }else{
    return (
      <Image style={styles.icon} source={require('../../assets/images/machineries/ic_excavator.png')}/> 
    )
  }
};

export default class OrderProgressItem extends Component {
  static propTypes = {
    vehicle_name: PropTypes.string,
    vehicle_code: PropTypes.string,
    vehicle_driver_name: PropTypes.string
  }

  render() {
    const {vehicle_name, vehicle_code, vehicle_driver_name, is_uploaded} = this.props;

    return (
      <CardLayout>
        <View style={styles.pillContainer} >
          <StatusPill isUploaded={is_uploaded} />
        </View>
        <View style={styles.cardBody}>
          <VehicleIcon vehicle_name={vehicle_name} />
          <View>
            <TextFont fontSize={18} fontWeight={'bold'} paddingBottom={5}>
              {vehicle_name}
            </TextFont>
            <TextFont fontSize={16} paddingBottom={5}>
              <TextFont fontWeight={'bold'}>Registro: </TextFont>{vehicle_code}
            </TextFont>
            <TextFont fontSize={16} paddingBottom={5}>
              <TextFont fontWeight={'bold'}>Operador: </TextFont>{vehicle_driver_name}
            </TextFont>
          </View>
          <Image
            style={styles.iconArrow}
            source={require('../../assets/images/icons/ic_right_arrow.png')}
          />
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  cardBody: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 68,
    height: 68,
    marginRight: 15,
  },
  iconArrow: {
    width: 15,
    height: 20,
  },
  pillContainer:{
    position: 'absolute',
    right: 0,
    top: 0,
  }
});
