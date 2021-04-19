import React from 'react';
import {View, StyleSheet} from 'react-native';

class HorizontalLayout extends React.Component {
  render() {
    return <View style={styles.view}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HorizontalLayout;
