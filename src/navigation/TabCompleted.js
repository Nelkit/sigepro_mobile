import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
} from 'react-native';
import Colors from '../core/colors';

class TabCompleted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
      <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.scene}>
            <Text>TAB2 </Text>  
        </View>
      </ScrollView>
    </SafeAreaView>
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

export default TabCompleted;