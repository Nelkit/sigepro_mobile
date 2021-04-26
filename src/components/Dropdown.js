import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Colors from '../core/colors';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

export default class Dropdown extends Component {
  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    placeholder: PropTypes.object,
  }

  render() {
    const {value, items, placeholder} = this.props;

    return (
      <View style={styles.pickerBox}>
        <RNPickerSelect
            style={{
              ...styles.picker,
            }}
            placeholder={placeholder}
            value={value}
            useNativeAndroidPickerStyle={false}
            onValueChange={this.props.onValueChange}
            items={items}
            Icon={() => {
              return <Image style={styles.chevronIcon} source={require('../assets/images/icons/ic_bottom_arrow.png')}  />;
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerBox: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    color: Colors.primaryText,
    backgroundColor: '#F2F2F2',
    borderColor: '#ddd',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 16,
  },
  chevronIcon:{
    width: 25,
    height: 18,
    resizeMode: 'contain'
  },
});