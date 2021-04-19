import React from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      env: 'staging',
    };
  }

  getCurrentEnv = async () => {
    const currentEnv = await AsyncStorage.getItem('currentEnv');
    this.setState({env: currentEnv});
  };

  componentDidMount() {
    this.getCurrentEnv();
  }

  render() {
    return (
      <View>
        {this.state.env === 'staging' && (
          <Image
            resizeMode="contain"
            style={
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: '100%',
                height: '90%',
                flex: 1,
              }
            }
            source={require('../assets/images/logo_fide.png')}
          />
        )}

        {this.state.env === 'production' && (
          <Image
            resizeMode="contain"
            style={
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: '100%',
                height: '90%',
                flex: 1,
              }
            }
            source={require('../assets/images/logo_h.png')}
          />
        )}
      </View>
    );
  }
}
export default HeaderLogo;
