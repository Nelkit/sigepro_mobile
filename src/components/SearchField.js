import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Image} from 'react-native';
import Colors from '../core/colors';

export default class SearchField extends Component {
  render() {
    return (
      <View style={styles.containerField}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/ic_search_gray.png')}
          />
        </View>
        <TextInput
          style={styles.searchField}
          placeholder={this.props.placeholder}
          placeholderTextColor={Colors.secondaryText}
          onChangeText={text => this.props.onChangeText(text)}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerField: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    position: 'relative',
  },
  searchField: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    color: Colors.primary,
    backgroundColor: 'white',
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 18,
    position: 'relative',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    height: 17,
    width: 17,
  },
  iconContainer:{
    position: 'absolute',
    top: 32,
    left: 25,
    zIndex: 1,
    elevation: 3,
  },
});
