import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types'

export default class MaterialButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPress: false,
    };
  }
  
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    disabledText: PropTypes.string,
    disabled: PropTypes.bool,
    height: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    fontSize: PropTypes.number,
    uppercase: PropTypes.bool,
    borderRadius: PropTypes.number,
  }

  static defaultProps = {
    height: 50,
    paddingHorizontal: 40,
    fontSize: 20,
    uppercase: true
  }

  render() {
    const {title, color, backgroundColor, disabledText, disabled, height, paddingHorizontal, fontSize, uppercase, borderRadius} = this.props;

    return (
      <TouchableHighlight
        underlayColor= 'none'
        onHideUnderlay={() =>{
          this.setState({isPress: false})
        }}
        onShowUnderlay={() =>{
          this.setState({isPress: true})
        }}
        disabled={disabled}
        style = {this.state.isPress ? styles.btnPress : styles.btnNormal}
        activeOpacity={disabled ? 0.1 : 1}
        onPress={this.props.onPress}>
        <View style={[
          styles.button,
          {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            height: height,
            paddingHorizontal: paddingHorizontal,
          },
        ]}>
          <View style={styles.icon}>{this.props.children}</View>
          <Text style={{color: color, fontSize: fontSize, textTransform: uppercase ? 'uppercase': 'none'}}>
            {disabled ? disabledText : title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    flexDirection: 'row',
  },
  btnNormal: {
    transform: [{ scale: 1 }]
  },
  btnPress: {
    transform: [{ scale: 0.9 }]
  }
});
