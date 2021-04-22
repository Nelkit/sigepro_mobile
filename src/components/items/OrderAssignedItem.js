import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardLayout from '../CardLayout'
import MaterialButton from '../MaterialButton'
import Colors from '../../core/colors'
import Helpers from '../../core/helpers'

export default class OrderAssignedItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <CardLayout>
        <View style={styles.cardbody}>
          <Text style={styles.text}>
            <Text style={styles.textbold}>Proyecto: </Text>{this.props.project_name}
          </Text>
          <View style={styles.divider}/>
          <Text style={styles.text}>
            <Text style={styles.textbold}>Orden: </Text>#{this.props.order_number}
          </Text>
          <View style={styles.divider}/>
          <Text style={styles.textbold}>Kilometros por tramo: </Text>
          <Text style={styles.textbold}>Horas por Maquinaria: </Text>
          <View style={styles.divider}/>
          <View style={styles.bottom}>
            <Text style={styles.text}>{Helpers.getDateFromNow(this.props.date)}</Text>
            <MaterialButton
              title="Comenzar"
              backgroundColor={Colors.primaryColor}
              color={Colors.white}
            />
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
  divider: {
    marginVertical: 15,
    backgroundColor: "#F2F2F2",
    height: 2,
    width: "100%"
  },
  text: {
    fontSize: 18,
  },
  textbold:{
    fontSize: 18,
    fontWeight: "bold" 
  },
  bottom:{
    flexDirection: "row",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
