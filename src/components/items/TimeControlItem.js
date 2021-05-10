import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import Divider from '../Divider'
import TextFont from '../TextFont'
import PropTypes from 'prop-types'
import MaterialButton from '../MaterialButton';
import Row from '../Row';
import Col from '../Col';
import EmptyBox from '../EmptyBox';
import Colors from '../../core/colors';
import StatusPill from '../StatusPill'

const Cell = ({ date, initial_hourmeter, final_hourmeter, hours, is_uploaded }) => {
  return (
    <CardLayout >  
      <View style={styles.pillContainer} >
        <StatusPill isUploaded={is_uploaded} />
      </View> 
      <View style={styles.cellBody}>
        <Row>
          <Col weight={2}>
            <TextFont fontSize={16} fontWeight={'bold'}>Fecha</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{date}</TextFont>
          </Col>
          <Col weight={2} paddingLeft={3}>
            <TextFont fontSize={16} fontWeight={'bold'}>Horas</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{hours}</TextFont>
          </Col>
        </Row>
        <Row>
          <Col weight={2}>
            <TextFont fontSize={16} fontWeight={'bold'}>H. Inicial</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{initial_hourmeter}</TextFont>
          </Col>
          <Col weight={2} paddingLeft={3}>
            <TextFont fontSize={16} fontWeight={'bold'}>H. Final</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{final_hourmeter}</TextFont>
          </Col>

        </Row>
      </View>   
    </CardLayout>
  )
};

export default class TimeControlItem extends Component {

  render() {
    const {time_controls, order_status} = this.props;

    return (
      <View style={styles.body}>
        <FlatList  
          style={styles.flatList}
          data={time_controls}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyBox title={'Todavia no se ha registrado ninguna hora de trabajo.'}  /> }
          contentContainerStyle={time_controls.length === 0 ? styles.centerEmptySet : {paddingTop: 10}}
          renderItem={({index, item}) => {
            return (
              <Cell
                date={`${item.day} ${item.month} ${item.year}`}
                initial_hourmeter={item.initial_hourmeter}
                final_hourmeter={item.final_hourmeter}
                hours={item.hours}
                is_uploaded={item.is_uploaded}
              />
            )
          }}
        />
        {order_status != 'completed' &&        
          <View style={styles.containerButton}>
            <MaterialButton
              title="REGISTRAR HORAS"
              backgroundColor={Colors.successColor}
              color={Colors.white}
              height={56}
              paddingHorizontal={15}
              uppercase={true}
              borderRadius={28}
              onPress={this.props.onPress}
            >          
              <Image
                style={styles.icon}
                source={require('../../assets/images/icons/ic_clock.png')}
                />
            </MaterialButton>
          </View>
        }
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
  flatList:{
    height: '100%'
  },
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
  },
  cellBody:{
    paddingHorizontal: 25,
    paddingVertical: 25,
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
  },
  pillContainer:{
    position: 'absolute',
    right: 0,
    top: 0,
  }
});