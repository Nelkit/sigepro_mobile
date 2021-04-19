import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default class MaterialButton extends Component {
  render() {
    this.color = this.props.color;
    this.background = this.props.backgroundColor;

    return (
      <TouchableOpacity
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: this.background,
            borderRadius: 8,
          },
        ]}
        disabled={this.props.disabled}
        activeOpacity={this.props.disabled ? 0.1 : 1}
        onPress={this.props.onPress}>
        <Text style={[styles.button, {color: this.color}]}>
          {this.props.disabled ? this.props.disabledText : this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 40,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
