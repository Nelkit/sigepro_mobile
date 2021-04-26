import React from 'react';
import {View, StyleSheet} from 'react-native';

class Row extends React.Component {
  render() {
    return <View style={styles.row}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  row: {
    display:'flex',
    flexDirection:'row',
  },
});

export default Row;
