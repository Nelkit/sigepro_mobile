import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import CardLayout from '../CardLayout'
import TextFont from '../TextFont'
import PropTypes from 'prop-types'
import Colors from '../../core/colors'

export default class OrderHeader extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    projectName: PropTypes.string,
  }

  render() {
    const {projectName} = this.props;

    return (
      <View style={styles.header}>
        <TextFont fontSize={18} color={Colors.primaryText}>
          <TextFont fontWeight={'bold'} color={Colors.primaryText}>Proyecto: </TextFont>{projectName}
        </TextFont>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 0,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
});
