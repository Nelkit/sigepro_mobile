import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';
import Helpers from '../core/helpers';

class ProgramaCell extends React.Component {
  render() {
    return (
      <View style={styles.body}>
        <HorizontalLayout>
          <View style={styles.containerPath}>
            <View style={styles.horizontalPath} />
            <View style={styles.verticalPath1} />
            {!this.props.isLastItem && <View style={styles.verticalPath2} />}
          </View>
          <View 
            style={[
              styles.circleIndicator,
              {
                backgroundColor: Helpers.colorByPercentage(
                  this.props.porcentaje,
                ),
              },
            ]}
          >
            <Text style={styles.circleText}>{Helpers.fixedTo(this.props.porcentaje)}%</Text>
          </View>
          <View style={styles.wrapperCell}>
            <HorizontalLayout>
              <View style={styles.containerText}>
                <Text style={styles.title}>{this.props.title}</Text>
              </View>
              <Image
                style={styles.icon}
                source={require('../assets/icons/ic_right_arrow.png')}
              />
            </HorizontalLayout>
            <View style={styles.containerProgressBar}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: this.props.porcentaje > 100 ? 100 : this.props.porcentaje + '%',
                    backgroundColor: '#2FA69A',
                  },
                ]}
              />
            </View>
          </View>
        </HorizontalLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'white',
    height: 100,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: Colors.primaryText,
  },
  containerText: {
    marginTop: 10,
    marginLeft: 10,
    flex: 4,
  },
  wrapperCell: {
    flex: 4,
  },
  circleIndicator: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: Colors.primaryDarkText,
    fontSize: 12,
  },
  containerPath: {
    position: 'relative',
    height: '100%',
    width: 30,
  },
  horizontalPath: {
    height: 2,
    width: '50%',
    left: '50%',
    top: '50%',
    backgroundColor: '#A1A1A1',
  },
  verticalPath1: {
    width: 2,
    height: '50%',
    left: '50%',
    backgroundColor: '#A1A1A1',
  },
  verticalPath2: {
    width: 2,
    height: '50%',
    left: '50%',
    backgroundColor: '#A1A1A1',
  },
  containerProgressBar: {
    marginHorizontal: 10,
    height: 10,
    flex: 1,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#AEECE6',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 11,
  },
});

export default ProgramaCell;
