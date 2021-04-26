import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Divider from '../Divider'
import TextFont from '../TextFont'
import PropTypes from 'prop-types'
import MaterialButton from '../MaterialButton';
import Colors from '../../core/colors';
import Row from '../Row';
import Col from '../Col';

const Cell = ({ day, reason_str, hours }) => {
  return (
    <Row>
      <Col>
        <TextFont fontSize={16} paddingBottom={5} >{day}</TextFont>
      </Col>
      <Col weight={3}>
        <TextFont fontSize={16} paddingBottom={5} >{reason_str}</TextFont>
      </Col>
      <Col>
        <TextFont fontSize={16} paddingBottom={5} >{hours}</TextFont>
      </Col>
    </Row>
  )
};

export default class NonWorkingHourItem extends Component {
  static propTypes = {
    non_working_hours: PropTypes.object,
    months: PropTypes.object,
  }

  render() {
    const {non_working_hours, months} = this.props;

    return (
      <CardLayout>
        <View style={styles.cardBody}>
          <Row>
            <Col>
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Dia</TextFont>
            </Col>
            <Col weight={3}>
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Razón</TextFont>
            </Col>
            <Col >
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Horas</TextFont>
            </Col>
          </Row>
          <Divider />
          {months.map((month, m) => (
            <View key={m}>
              {non_working_hours.map((item, i) => {      
                if (item.month == month.month && item.year == month.year){
                  return (     
                    <View key={i}>
                      { i == 0 &&<TextFont  
                        fontSize={20} 
                        fontWeight={'bold'} 
                        paddingTop={0} 
                        paddingBottom={5}>
                          {month.month} {month.year}
                        </TextFont>
                      }
                      <Cell
                        day={item.day}
                        reason_str={item.reason_str}
                        hours={item.hours}
                      />
                      </View>
                    )
                  }
                
            })}
            </View>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <MaterialButton
            title="REGISTRAR HORAS INHABILES"
            backgroundColor={Colors.dangerColor}
            color={Colors.white}
            height={56}
            paddingHorizontal={15}
            uppercase={true}
            borderRadius={0}
            onPress={this.props.onPress}
          >          
            <Image
              style={styles.icon}
              source={require('../../assets/images/icons/ic_non_working.png')}
              />
          </MaterialButton>
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  cardFooter: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden'
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
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  }
});