import React from 'react';
import {Text, StyleSheet} from 'react-native';

class ErrorMessage extends React.Component {
  render() {
    return (
      <Text style={styles.errorMessage}>
       {this.props.children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'pink',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});

export default ErrorMessage;
