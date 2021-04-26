import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '../../core/colors';
import LottieView from 'lottie-react-native';

class SyncItem extends React.Component {
  render() {
    return (
      <View style={styles.body}>
        <View style={styles.containerCheck}>
          <LottieView
            style={styles.check}
            source={require('../../assets/lottieFiles/check.json')}
            autoPlay
            loop={false}
          />
        </View>
        <Text style={styles.title}>{this.props.title}...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primaryText,
    flex: 5,
  },
  containerCheck: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    marginTop: 8,
  },
  check: {
    position: 'absolute',
    width: 100,
  },
  body: {
    flex: 6,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default SyncItem;
