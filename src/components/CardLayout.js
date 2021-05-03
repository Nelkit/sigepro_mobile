import React from 'react';
import {View, StyleSheet} from 'react-native';

class EmptyBox extends React.Component {
  render() {
    return <View style={styles.card}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderBottomWidth: 0,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
    marginBottom: 7,
  },
});

export default EmptyBox;
