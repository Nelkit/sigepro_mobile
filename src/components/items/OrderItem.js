import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Pill from '../Pill'
import StatusPill from '../StatusPill'
import MaterialButton from '../MaterialButton'
import Divider from '../Divider'
import TextFont from '../TextFont'
import Colors from '../../core/colors'
import Helpers from '../../core/helpers'
import PropTypes from 'prop-types'

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.number,
    buttonTitle: PropTypes.string,
    didPressButton: PropTypes.func,
    projectName: PropTypes.string,
    orderNumber: PropTypes.string,
    distancesByWork: PropTypes.object,
    hoursByVehicle: PropTypes.object,
    date: PropTypes.instanceOf(Date),
    isUploaded: PropTypes.bool,
  }

  static defaultProps = {
    buttonTitle: undefined,
    projectName: '',
    orderNumber: '',
    distancesByWork: [],
    hoursByVehicle: [],
  }

  render() {
    const {id, buttonTitle, didPressButton, projectName, orderNumber, distancesByWork, hoursByVehicle, isUploaded, date} = this.props;

    return (
      <CardLayout>
        <View style={styles.pillContainer} >
          <StatusPill isUploaded={isUploaded} />
        </View>
        <View style={styles.cardbody}>
          {projectName.length > 0 && (
            <View>
              <TextFont fontSize={18}>
                <TextFont fontWeight={'bold'}>Proyecto: </TextFont>{projectName}
              </TextFont>
              <Divider/>
            </View>
          )}
          <TextFont fontSize={18}>
            <TextFont fontWeight={'bold'}>Orden: </TextFont>#{orderNumber}
          </TextFont>
          <Divider/>
          <TextFont fontSize={18} fontWeight={'bold'}>Kilometros por tramo: </TextFont>
          <FlatList
              style={styles.flatlist}
              horizontal
              data={distancesByWork}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({index, item}) => {
                return (
                  <Pill title={item.work_type_title} value={`${item.distance} KM`} color={item.work_type_color} />
                );
              }}
          />
          <TextFont fontSize={18} fontWeight={'bold'}>Horas por Maquinaria: </TextFont>
          <FlatList
            style={styles.flatlist}
            data={hoursByVehicle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({index, item}) => {
              return (
                <Text>{item.hours} Hrs {item.vehicle_data.title}</Text>
              );
            }}
          />
          <Divider/>
          <View style={styles.bottom}>
            <View style={styles.datecontainer}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/icons/ic_calendar.png')}
              />
              <Text style={styles.datetext}>{Helpers.getDateFromNow(date)}</Text>
            </View>
            {buttonTitle.length > 0 &&(
              <MaterialButton
                title={buttonTitle}
                backgroundColor={Colors.primaryColor}
                color={Colors.white}
                height={35}
                borderRadius={17.5}
                paddingHorizontal={15}
                uppercase={false}
                onPress={()=> didPressButton(id)}
              />
            )}
          </View>
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  cardbody: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 30,
    borderRadius: 25,
  },
  datecontainer:{
    flexDirection: "row",
    display: 'flex',
    alignItems: 'center',
  },
  datetext:{
    fontSize: 12,
    fontWeight: "bold",
    color: "#565656"
  },
  bottom:{
    flexDirection: "row",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 7,
  },
  flatlist: {
    marginTop: 5,
    marginBottom: 10,
  },
  pillContainer:{
    position: 'absolute',
    right: 0,
    top: 0,
  }
});
