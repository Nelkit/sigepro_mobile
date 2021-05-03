import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

class Col extends React.Component {
  static propTypes = {
    weight: PropTypes.number,
    paddingLeft: PropTypes.number,
  }

  static defaultProps = {
    weight: 1,
    paddingLeft: 0,
  }

  render() {
    const {weight, paddingLeft} = this.props;

    return <View style={{flex: weight, paddingLeft: paddingLeft}}>{this.props.children}</View>;
  }
}

export default Col;
