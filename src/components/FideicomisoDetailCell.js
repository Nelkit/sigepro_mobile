import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import CardLayout from './CardLayout';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';
import Helpers from '../core/helpers';

class FideicomisoCell extends React.Component {
  render() {
    return (
      <CardLayout>
        <View style={styles.containerBody}>
          <Text style={styles.title}>{this.props.descripcion}</Text>
          <HorizontalLayout>
            <Text style={styles.primaryText}>{this.props.desembolsado} ML</Text>
            <Text style={styles.primaryText}>{this.props.ejecutado} ML</Text>
          </HorizontalLayout>
          <HorizontalLayout>
            <Text style={styles.secondaryText}>Desembolsado</Text>
            <Text style={styles.secondaryText}>Ejecutado</Text>
          </HorizontalLayout>
          <HorizontalLayout>
            <Text style={styles.percentageText}>
              {this.props.porcentaje_ejecucion} %
            </Text>
            <View
              style={[
                styles.containerProgressBar,
                {
                  borderColor: Helpers.colorByPercentage(
                    this.props.porcentaje_ejecucion,
                  ),
                },
              ]}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: '' + this.props.porcentaje_ejecucion + '%',
                    backgroundColor: Helpers.colorByPercentage(
                      this.props.porcentaje_ejecucion,
                    ),
                  },
                ]}
              />
            </View>
          </HorizontalLayout>
        </View>
        <View style={styles.bottomBar}>
          <HorizontalLayout>
            <Text style={styles.primaryText}>{this.props.asignado} ML</Text>
          </HorizontalLayout>
          <HorizontalLayout>
            <Text style={styles.secondaryText}>Asignado</Text>
            <Text style={styles.percentageText}>
              {this.props.porcentaje_asignado} %
            </Text>
          </HorizontalLayout>
          <View
            style={[
              styles.containerProgressBar,
              {borderColor: Colors.bar2Color},
            ]}>
            <View
              style={[
                styles.progressBar,
                {
                  width: '' + this.props.porcentaje_asignado + '%',
                  backgroundColor: Colors.bar2Color,
                },
              ]}
            />
          </View>
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primaryText,
  },
  primaryText: {
    fontSize: 18,
    color: Colors.primaryText,
  },
  secondaryText: {
    fontSize: 10,
    color: Colors.primaryText,
    marginVertical: 5,
  },
  percentageText: {
    fontSize: 14,
    color: Colors.primaryText,
    marginHorizontal: 5,
  },
  containerProgressBar: {
    height: 22,
    flex: 1,
    borderWidth: 1,
    padding: 2,
    borderRadius: 11,
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 11,
  },
  containerBody: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.bottomGray,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
});

export default FideicomisoCell;
