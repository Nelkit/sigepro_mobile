import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import CardLayout from './CardLayout';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';

class FideicomisoCell extends React.Component {
  render() {
    return (
      <CardLayout>
        <View style={styles.body}>
          <HorizontalLayout>
            <Image style={styles.icon} source={this.props.icon} />
            <View style={styles.containerText}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>{this.props.subtitle}</Text>
            </View>
            <Image
              style={styles.icon}
              source={require('../assets/icons/ic_right_arrow.png')}
            />
          </HorizontalLayout>
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 18,
    marginBottom: 5,
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  containerText: {
    flex: 4,
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default FideicomisoCell;
