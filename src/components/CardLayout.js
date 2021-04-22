import React from 'react';
import {View, StyleSheet} from 'react-native';

class CardLayout extends React.Component {
  render() {
    return <View style={styles.card}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderBottomWidth: 0,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

export default CardLayout;
