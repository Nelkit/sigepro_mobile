import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../core/colors';
import PropTypes from 'prop-types';

export default class TextField extends Component {
  static propTypes = {
    value: PropTypes.string, 
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool, 
    keyboardType: PropTypes.string,
  }

  static defaultProps = {
    value: "", 
  }

  render() {
    const {placeholder, value, secureTextEntry, keyboardType, onChangeText, returnKeyType, onKeyPress} = this.props;

    return (
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryText}
        value={value.toString()}
        autoCapitalize={'none'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onKeyPress={onKeyPress}
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
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 2,
  },
});
