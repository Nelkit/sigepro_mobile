import React from 'react';
import {View, StyleSheet} from 'react-native';

class Divider extends React.Component {

  render() {
    return (
      <View style={styles.divider}/>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 15,
    backgroundColor: "#F2F2F2",
    height: 2,
    width: "100%"
  },
});

export default Divider;