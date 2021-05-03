import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Pill from '../Pill'
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
    button_title: PropTypes.string,
    project_name: PropTypes.string,
    order_number: PropTypes.string,
    distances_by_work: PropTypes.object,
    hours_by_vehicle: PropTypes.object,
    date: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    button_title: undefined,
    project_name: '',
    order_number: '',
    distances_by_work: [],
    hours_by_vehicle: []
  }

  render() {
    const {button_title, project_name, order_number, distances_by_work, hours_by_vehicle, date} = this.props;

    return (
      <CardLayout>
        <View style={styles.cardbody}>
          <TextFont fontSize={18}>
            <TextFont fontWeight={'bold'}>Proyecto: </TextFont>{project_name}
          </TextFont>
          <Divider/>
          <TextFont fontSize={18}>
            <TextFont fontWeight={'bold'}>Orden: </TextFont>#{order_number}
          </TextFont>
          <Divider/>
          <TextFont fontSize={18} fontWeight={'bold'}>Kilometros por tramo: </TextFont>
          <FlatList
              style={styles.flatlist}
              horizontal
              data={distances_by_work}
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
            data={hours_by_vehicle}
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
            {button_title.length > 0 &&(
              <MaterialButton
                title={button_title}
                backgroundColor={Colors.primaryColor}
                color={Colors.white}
                height={35}
                borderRadius={17.5}
                paddingHorizontal={15}
                uppercase={false}
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
    paddingVertical: 15,
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
  }
});
