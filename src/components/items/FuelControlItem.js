import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Divider from '../Divider'
import TextFont from '../TextFont'
import PropTypes from 'prop-types'
import MaterialButton from '../MaterialButton';
import Row from '../Row';
import Col from '../Col';
import Colors from '../../core/colors';

const Cell = ({ day, quantity, price, hours }) => {
  return (
    <Row>
      <Col weight={1}>
        <TextFont fontSize={16} paddingBottom={5} >{day}</TextFont>
      </Col>
      <Col weight={1}>
        <TextFont fontSize={16} paddingBottom={5} >{quantity}Gls</TextFont>
      </Col>
      <Col weight={1}>
        <TextFont fontSize={16} paddingBottom={5} >L {price}</TextFont>
      </Col>
    </Row>
  )
};

export default class FuelControlItem extends Component {
  static propTypes = {
    fuel_controls: PropTypes.object,
    months: PropTypes.object,
  }

  render() {
    const {fuel_controls, months} = this.props;

    return (
      <CardLayout>
        <View style={styles.cardBody}>
          <Row>
            <Col>
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Dia</TextFont>
            </Col>
            <Col>
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Cantidad</TextFont>
            </Col>
            <Col>
              <TextFont fontSize={16} paddingBottom={5} fontWeight={'bold'}>Precio</TextFont>
            </Col>
          </Row>
          <Divider />
          {months.map((month, m) => (
            <View key={m}>
              {fuel_controls.map((item, i) => {      
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
                        quantity={item.quantity}
                        price={item.price}
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
            title="REGISTRAR COMBUSTIBLE"
            backgroundColor={Colors.warningColor}
            color={Colors.white}
            height={56}
            paddingHorizontal={15}
            uppercase={true}
            borderRadius={0}
            onPress={this.props.onPress}
          >          
            <Image
              style={styles.icon}
              source={require('../../assets/images/icons/ic_fuel.png')}
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