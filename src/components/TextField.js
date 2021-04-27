import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../core/colors';
import PropTypes from 'prop-types';

export default class TextField extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    secureTextEntry: PropTypes.bool, 
    keyboardType: PropTypes.string,
  }

  render() {
    const {placeholder, value, secureTextEntry, keyboardType} = this.props;

    return (
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryText}
        value={value}
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    color: Colors.primaryText,
    backgroundColor: '#F2F2F2',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 2,
  },
});
