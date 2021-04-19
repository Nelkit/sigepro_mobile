import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import Colors from '../core/colors';

import {BarChart} from 'react-native-charts-wrapper';

class WrapperBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: {
        enabled: false,
      },
      data: {
        dataSets: [
          {
            values: props.values,
            label: '',
            config: {
              colors: [
                processColor('#00B4DC'),
                processColor('#62A1FF'),
                processColor('#6562FF'),
              ],
            },
          },
        ],
        config: {
          barWidth: 0.8,
        },
      },
      xAxis: {
        valueFormatter: ['Asignado', 'Desembolsado', 'Pendiente'],
        position: 'BOTTOM',
        granularityEnabled: true,
        granularity: 1,
        textSize: 13,
      },
      marker: {
        enabled: true,
        markerColor: processColor('#000'),
        textColor: processColor('white'),
        markerFontSize: 9,
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          data={this.state.data}
          xAxis={this.state.xAxis}
          animation={{durationX: 2000}}
          legend={this.state.legend}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{x: {min: 0, max: 3}}}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={false}
          highlights={this.state.highlights}
          marker={this.state.marker}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            * Valores expresados en miles de millones
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  chart: {
    height: 200,
  },
  footer: {
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'flex-end',
  },
  footerText: {
    color: Colors.primaryDarkText,
    backgroundColor: 'gray',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 12,
  },
});

export default WrapperBarChart;
