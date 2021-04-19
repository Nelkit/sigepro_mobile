import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import CardLayout from './CardLayout';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';
import Helpers from '../core/helpers';

class FideicomisoProgramCell extends React.Component {
  render() {
    console.log(this.props)

    return (
      <View style={styles.wrapper}>
        <HorizontalLayout>
          <View style={styles.container}>
            <View style={styles.body}>
              <HorizontalLayout>
                <Text style={styles.title}>COMPONENTE</Text>
                <Text style={styles.title}>DESEMBOLSADO</Text>
                <Text style={styles.title}>LIQUIDADO</Text>
              </HorizontalLayout>
              <HorizontalLayout>
                <Text style={styles.subtitle}>{this.props.item.descripcion}</Text>
                <Text style={styles.subtitle}>
                  {this.props.item.desembolsado} ML
                </Text>
                <Text style={styles.subtitle}>{this.props.item.ejecutado} ML</Text>
              </HorizontalLayout>
            </View>
            <View style={styles.body}>
              <HorizontalLayout>
                <Text style={styles.title}>PRESUPUESTO ASIGNADO</Text>
                <Text style={styles.title}>% DE DESEMBOLSADO</Text>
                <Text style={styles.title}>% DE LIQUIDADO</Text>
              </HorizontalLayout>
              <HorizontalLayout>
                <Text style={styles.subtitle}>{this.props.item.asignado} ML</Text>
                <Text style={styles.subtitle}>
                  {this.props.item.porcentaje_desembolso}%
                </Text>
                <Text style={styles.subtitle}>
                  {this.props.item.porcentaje_ejecucion}%
                </Text>
              </HorizontalLayout>
            </View>
          </View>
          <View
            style={[
              styles.trailingBar,
              {
                backgroundColor: Helpers.colorByPercentage(
                  this.props.item.porcentaje_ejecucion,
                ),
              },
            ]}
          />
        </HorizontalLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderBottomColor: Colors.background,
    borderBottomWidth: 6,
  },
  title: {
    flex: 1,
    marginTop: 10,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    flex: 1,
    fontSize: 12,
    color: Colors.secondaryText,
    marginBottom: 10,
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  trailingBar: {
    width: 30,
    height: '100%',
  },
});

export default FideicomisoProgramCell;
