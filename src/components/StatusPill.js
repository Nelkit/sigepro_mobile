import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PropTypes from 'prop-types'
import Colors from '../core/colors'

class StatusPill extends React.Component {
  static propTypes = {
    isUploaded: PropTypes.bool,
  }

  render() {
    const {isUploaded} = this.props;
    return (
      <View style={[styles.pill, {backgroundColor: isUploaded ? '#2A6A9A' : '#9A2A2A' }]}>
        {isUploaded ? (
          <Image
            style={styles.icon}
            source={require('../assets/images/icons/ic_uploaded.png')}
          />
        ):(
          <Image
            style={styles.icon}
            source={require('../assets/images/icons/ic_pending_upload.png')}
          />
        )}

        <Text style={styles.text}>{isUploaded ? 'SUBIDO' : 'SIN SUBIR'}</Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  pill: {
    height: 25,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingLeft: 10,
    paddingVertical: 2,
    paddingRight: 15,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 10,
  },
  icon:{
    marginRight: 3,
    width: 18,
    height: 18
  }
});

export default StatusPill;