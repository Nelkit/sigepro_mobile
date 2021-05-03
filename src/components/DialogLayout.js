import React from 'react';
import {
  View, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import Colors from '../core/colors';
import TextFont from './TextFont';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'

class DialogLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }
  
  render() {
    const {title} = this.props;

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.overlayView}>
                <View style={styles.modalView}>
                    <View style={styles.modalBody}>
                      {this.props.children}
                    </View>
                </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  overlayView: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal:15,
  },
  modalView: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  scrollView: {
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  close: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  modalHeader:{
    display:'flex',
    flexDirection: 'row',
    alignItems:'center',
  },
  modalBody:{
    padding: 15,
  }
});

export default DialogLayout;
