import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types'

class TextFont extends React.Component {
  static propTypes = {
    fontWeight: PropTypes.string,
    fontSize: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    color: PropTypes.string,
  }

  static defaultProps = {
    paddingTop: 0,
    paddingBottom: 0,
  }

  render() {
    const {fontSize, fontWeight, paddingTop, paddingBottom, color} = this.props;
    
    return <Text style={{fontSize: fontSize, fontWeight: fontWeight, paddingTop: paddingTop, paddingBottom: paddingBottom, color: color}}>{this.props.children}</Text>;
  }
}

export default TextFont;