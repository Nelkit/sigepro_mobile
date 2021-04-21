import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../core/colors';

import TabAssigned from './TabAssigned'
import TabInProcess from './TabInProcess'
import TabCompleted from './TabCompleted'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Asignadas'},
      {key: 'second', title: 'En Proceso'},
      {key: 'third', title: 'Terminadas'},
    ],
  };

  render() {
    return (
      <>
        <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.backgroundColor}
        />
        <TabView
          swipeEnabled={false}
          navigationState={this.state}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <TabAssigned {...this.props} />;
              case 'second':
                return <TabInProcess {...this.props} />;
              case 'third':
                return <TabCompleted {...this.props} />;
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: Colors.accentColor}}
              style={{backgroundColor: Colors.secondaryColor}}
              scrollEnabled={false}
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
  container: {
    flex: 1,
  },
  section: {
    paddingBottom: 22,
  },
  scene: {
    backgroundColor: "#ffffff",
    height: '100%',
  },
});

export default HomeScreen;
