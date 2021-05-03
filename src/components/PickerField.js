import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import Colors from '../core/colors';
import PropTypes from 'prop-types';

class PickerField extends React.Component {
  static propTypes = {
    value: PropTypes.string, 
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    value: "", 
    placeholder: "placeholder", 
  }

  render() {
    const {placeholder, value } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.props.onPress}>
          <View style={styles.pickerField} >
                <Text 
                  numberOfLines={1} 
                  ellipsizeMode='tail' 
                  style={[styles.text, {color: value.length>0 ? Colors.primaryText : Colors.secondaryText}]}
                >
                    {value.length>0 ? value : placeholder}
                </Text>
                <Image style={styles.chevronIcon} source={require('../assets/images/icons/ic_bottom_arrow.png')}  />
          </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  chevronIcon:{
    width: 25,
    height: 18,
    resizeMode: 'contain'
  },
  pickerField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
    color: Colors.primaryText,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 2,
  },
});

export default PickerField;