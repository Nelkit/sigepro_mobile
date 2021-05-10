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
import EmptyBox from '../EmptyBox';
import StatusPill from '../StatusPill'

const Cell = ({ date, reason_str, hours, observations, is_uploaded }) => {
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
            <TextFont fontSize={16} fontWeight={'bold'}>Razón</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{reason_str}</TextFont>
          </Col>
          <Col weight={1} paddingLeft={3}>
            <TextFont fontSize={16} fontWeight={'bold'}>Horas</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{hours}</TextFont>
          </Col>
        </Row>
        <Row>
          <Col weight={1}>
            <TextFont fontSize={16} fontWeight={'bold'}>Observación</TextFont>
            <TextFont fontSize={16} paddingBottom={10} >{observations}</TextFont>
          </Col>
        </Row>
      </View>   
    </CardLayout>

  )
};

export default class NonWorkingHourItem extends Component {

  render() {
    const {non_working_hours, order_status} = this.props;

    return (
      <View style={styles.body}>
        <FlatList  
          style={styles.flatList}
          data={non_working_hours}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ <EmptyBox title={'Todavia no se ha registrado ninguna hora inhabil.'}  />  }
          contentContainerStyle={non_working_hours.length === 0 ? styles.centerEmptySet : {paddingTop: 10}}
          renderItem={({index, item}) => {
            return (
              <Cell
                date={`${item.day} ${item.month} ${item.year}`}
                reason_str={item.reason_str}
                hours={item.hours}
                observations={item.observations}
                is_uploaded={item.is_uploaded}
              />
            )
          }}
        />
        {order_status != 'completed' && (
          <View style={styles.containerButton}>
            <MaterialButton
              title="REGISTRAR HORAS INHABILES"
              backgroundColor={Colors.dangerColor}
              color={Colors.white}
              height={56}
              paddingHorizontal={15}
              uppercase={true}
              borderRadius={28}
              onPress={this.props.onPress}
            >          
              <Image
                style={styles.icon}
                source={require('../../assets/images/icons/ic_non_working.png')}
                />
            </MaterialButton>
          </View>
        )}
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
    paddingHorizontal: 25,
    paddingVertical: 25,
  }, 
  flatList:{
    height: '100%'
  },
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
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