import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../core/colors';

export default class LoginTextInput extends Component {
  render() {
    return (
      <TextInput
        style={styles.textInput}
        placeholder={this.props.placeholder}
        placeholderTextColor={Colors.secondaryText}
        value={this.props.value}
        autoCapitalize={'none'}
        secureTextEntry={this.props.secureTextEntry}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    color: Colors.primaryText,
    backgroundColor: '#F2F2F2',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 2,
  },
});
