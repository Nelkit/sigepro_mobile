import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CardLayout from './CardLayout';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';
import FastImage from 'react-native-fast-image';

class SectorCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <CardLayout>
        <View style={styles.body}>
          <HorizontalLayout>
          <FastImage
            style={[
              styles.icon,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: 40,
                height: 40,
              },
            ]}
            source={{
              uri: this.props.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
            <View style={styles.containerText}>
              <Text style={styles.title}>{this.props.title}</Text>
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
    marginTop: 5,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  containerText: {
    flex: 4,
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wrapperPrograms: {
    backgroundColor: '#F1F1F1',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
  },
});

export default SectorCell;
