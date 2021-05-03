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
import EmptyBox from '../EmptyBox';

const Cell = ({ date, quantity, price }) => {
  return (
    <CardLayout >   
      <View style={styles.cellBody}>
        <Row>
          <Col weight={2}>
            <TextFont fontSize={16} fontWeight={'bold'}>Fecha</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{date}</TextFont>
          </Col>
          <Col weight={2} paddingLeft={3}>
            <TextFont fontSize={16} fontWeight={'bold'}>Cantidad</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{quantity}Gls</TextFont>
          </Col>
        </Row>
        <Row>
          <Col weight={1}>
            <TextFont fontSize={16} fontWeight={'bold'}>Precio</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >L {price}</TextFont>
          </Col>
        </Row>
      </View>   
    </CardLayout>
  )
};

export default class FuelControlItem extends Component {

  render() {
    const { fuel_controls } = this.props;

    return (
      <View style={styles.body}>
        {fuel_controls.length > 0 ? 
          (
            <FlatList  
              style={styles.flatList}
              data={fuel_controls}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingTop: 10}}
              renderItem={({index, item}) => {
                return (
                  <Cell
                      date={`${item.day} ${item.month} ${item.year}`}
                      quantity={item.quantity}
                      price={item.price}
                      hours={item.hours}
                    />
                )
              }}
            />
          ) : (
            <EmptyBox title={'Todavia no se ha registrado ninguna carga de combustible.'}  /> 
          )                 
        }
        <View style={styles.containerButton}>
          <MaterialButton
            title="REGISTRAR COMBUSTIBLE"
            backgroundColor={Colors.warningColor}
            color={Colors.white}
            height={56}
            paddingHorizontal={15}
            uppercase={true}
            borderRadius={28}
            onPress={this.props.onPress}
          >          
            <Image
              style={styles.icon}
              source={require('../../assets/images/icons/ic_fuel.png')}
              />
          </MaterialButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cellBody:{
    padding: 15,
  },  
  containerButton:{
    marginTop: 10,
    marginHorizontal: 15
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