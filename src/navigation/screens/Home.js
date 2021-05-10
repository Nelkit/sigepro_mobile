import React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../../core/colors';

import TabAssigned from '../tabs/TabAssigned'
import TabInProcess from '../tabs/TabInProcess'
import TabCompleted from '../tabs/TabCompleted'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Asignadas'},
      {key: 'second', title: 'En Curso'},
      {key: 'third', title: 'Terminadas'},
    ],
  };

  componentDidMount = () =>{
    const {navigation} = this.props;
    const {navigate} = navigation;

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.containerNavIcon}
          onPress={() => {navigate("Profile")}}>
          <Image
            style={styles.navIcon}
            source={require('../../assets/images/icons/ic_profile.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.containerNavIcon}
          onPress={() => {console.log("Hola")}}>
          <Image
            style={styles.navIcon}
            source={require('../../assets/images/icons/ic_bell.png')}
          />
        </TouchableOpacity>
      ),
    });
  }

  render() {
    return (
      <>
        <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.backgroundColor}
        />
        <TabView
          swipeEnabled={true}
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
              indicatorStyle={{backgroundColor: Colors.accentColor, height: 5}}
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
  containerNavIcon:{
    paddingHorizontal: 20
  }, 
  navIcon: {
    height: 24,
    width: 24
  }
});

export default Home;
