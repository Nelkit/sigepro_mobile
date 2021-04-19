import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import CardLayout from './CardLayout';
import HorizontalLayout from './HorizontalLayout';
import Colors from '../core/colors';
import Helpers from '../core/helpers';
import MaterialButton from './MaterialButton';

class IndicadorCell extends React.Component {
  calcularAvancePorDias() {
    var resultado = 0;
    var dias_fecha = Helpers.daysBetween(
      new Date(this.props.fecha_inicio),
      new Date(),
    );

    resultado = (dias_fecha * this.props.alcance) / this.props.total_dias;

    return parseFloat(resultado).toFixed(2);
  }

  calcularPorcentajeAvance() {
    var resultado = 0;
    resultado = (this.props.avance / this.calcularAvancePorDias()) * 100;
    return parseFloat(resultado).toFixed(2);
  }

  render() {
    return (
      <CardLayout>
        <View style={styles.containerBody}>
          <View style={styles.containerTitle}>
            <View
              style={[
                styles.circleIndicator,
                {
                  backgroundColor: Helpers.colorByPercentage(
                    this.props.porcentaje,
                  ),
                },
              ]}
            />
            <Text style={styles.title}>{this.props.nombre_indicador}</Text>
          </View>
          <HorizontalLayout>
            <Text style={styles.secondaryText}>{this.props.unidad}</Text>
          </HorizontalLayout>
          <HorizontalLayout>
            <Text style={styles.primaryText}>
              {this.props.avance + ' / ' + this.calcularAvancePorDias()}
            </Text>
            <Text style={styles.primaryText}>
              {'% de ' + this.props.alcance}
            </Text>
          </HorizontalLayout>
          <HorizontalLayout>
            <Text style={styles.primaryText}>
              {this.calcularPorcentajeAvance() + '%'}
            </Text>
            <Text style={styles.primaryText}>
              {this.props.porcentaje + '%'}
            </Text>
          </HorizontalLayout>
          <View style={styles.containerProgressBar}>
            <View
              style={[
                styles.progressBar,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: this.props.porcentaje > 100 ? 100 : this.props.porcentaje + '%',
                  backgroundColor: '#2FA69A',
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.buttonMore}>
            <Text style={styles.buttonText}>Ver Avances</Text>
          </View>
        </View>
      </CardLayout>
    );
  }
}

const styles = StyleSheet.create({
  containerTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primaryText,
  },
  primaryText: {
    fontSize: 18,
    color: Colors.primaryText,
    paddingVertical: 3,
  },
  secondaryText: {
    fontSize: 12,
    color: Colors.primaryText,
    marginVertical: 5,
  },
  percentageText: {
    fontSize: 14,
    color: Colors.primaryText,
    marginHorizontal: 5,
  },
  containerProgressBar: {
    marginTop: 15,
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
  containerBody: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  circleIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.bottomGray,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  buttonMore: {
    backgroundColor: Colors.indicatorButton,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    color: Colors.white,
  },
});

export default IndicadorCell;
