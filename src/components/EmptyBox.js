import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types'
import Colors from '../core/colors'

class EmptyBox extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'default',
  } 

  render() {
    const {title, type} = this.props;

    return(
      <View style={styles.emptyBox}>
        <View style={styles.emptyBody}>
          {type == 'default' ?
            (          
              <Image
                style={styles.emptyIcon}
                source={require('../assets/images/icons/ic_empty_list.png')}
              />
            ) : (
              <Image
                style={styles.emptyIcon}
                source={require('../assets/images/icons/ic_excavator_placeholder.png')}
              />
            )
          }
          <Text style={styles.emptyLabel}>{title}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyBox:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
    paddingHorizontal: 15,
  },
  emptyBody:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon:{
    height: 115,
    width: 115,
  },
  emptyLabel:{
    paddingTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.secondaryText,
  },
});

export default EmptyBox;
