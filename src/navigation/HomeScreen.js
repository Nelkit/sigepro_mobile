import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../core/colors';
import SummaryTab from './SummaryTab';
import TypeTab from './TypeTab';
import IndicadoresTab from './IndicadoresTab';
import PromesasTab from './PromesasTab';
import HeaderLogo from '../components/HeaderLogo';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: <View />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: 24,
              height: 24,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginRight: 15,
            }
          }
          source={require('../assets/icons/ic_profile.png')}
        />
      </TouchableOpacity>
    ),
    title: 'Inicio',
  });

  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Macro Económicos'},
      {key: 'second', title: 'Resumen'},
      {key: 'third', title: 'Fideicomisos'},
      {key: 'four', title: 'Promesas Presidenciales'},
    ],
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.primaryColor}
        />
        <TabView
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <IndicadoresTab {...this.props} />;
              case 'second':
                return <SummaryTab {...this.props} />;
              case 'third':
                return <TypeTab {...this.props} />;
              case 'four':
                return <PromesasTab {...this.props} />;
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.accentColor}}
              style={{backgroundColor: Colors.secondaryColor}}
              scrollEnabled={true}
            />
          )}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default HomeScreen;
