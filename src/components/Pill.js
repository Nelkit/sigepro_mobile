import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

class Pill extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
  }

  getFontColor (color){
    return {color: tinycolor(`#${color}`).isDark() ? '#ffffff' : tinycolor(`#${color}`).darken(40).toString() }
  }

  render() {
    const {color, value, title} = this.props;

    return (
      <View style={[styles.pill, {backgroundColor: `#${color}` }]}>
        <View style={styles.valueContainer}>
          <Text style={[styles.text, this.getFontColor(color)]}>{value}</Text>
        </View>
        <Text style={[styles.text, this.getFontColor(color)]}>{title}</Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  pill: {
    borderRadius: 15,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    marginRight: 5,
    marginBottom: 5,
    paddingRight: 10,
  },
  valueContainer: {
    marginRight: 5,
    paddingHorizontal: 10,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
});

export default Pill;