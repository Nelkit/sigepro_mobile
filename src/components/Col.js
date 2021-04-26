import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

class Col extends React.Component {
  static propTypes = {
    weight: PropTypes.number,
  }

  static defaultProps = {
    weight: 1,
  }

  render() {
    const {weight} = this.props;

    return <View style={{flex: weight}}>{this.props.children}</View>;
  }
}

export default Col;
