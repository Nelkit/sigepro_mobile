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

class ModalLayout extends React.Component {
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
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.props.handleCloseModal}>
                  <Image
                    style={styles.close}
                    source={require('../assets/images/icons/ic_close.png')}
                  />
                </TouchableOpacity>
                <TextFont fontSize={24} fontWeight={'bold'}>{title}</TextFont>
              </View>
              <KeyboardAwareScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={styles.modalBody}>
                  {this.props.children}
                </View>
              </KeyboardAwareScrollView>
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
    bottom: -40,
  },
  overlayView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  modalView: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
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
  },
  scrollView: {
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
    paddingVertical: 30,
  }
});

export default ModalLayout;
