import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import Helpers from '../core/helpers';
import Colors from '../core/colors';
import RangeSlider from 'rn-range-slider';

import {LineChart} from 'react-native-charts-wrapper';

class WrapperComparativeLineChart extends React.Component {
  constructor(props) {
    super(props);

    var labels = [];
    var values = [];
    var values2 = [];

    for (var i in props.values) {
      var date = Helpers.getDDMMYYYY(props.values[i].label);
      var value = props.values[i].y;

      var month = Helpers.getMM(props.values[i].label);
      labels.push(month);

      values.push({
        y: value,
        marker: date + '\n' + 'Valor: ' + value,
      });
    }

    for (var i in props.values2) {
      var date = Helpers.getDDMMYYYY(props.values[i].label);
      var value = props.values2[i].y;

      values2.push({
        y: value,
        marker: date + '\n' + 'Valor: ' + value,
      });
    }

    this.state = {
      legend: {
        enabled: true,
      },
      data: {
        dataSets: [
          {
            values: values2,
            label: this.props.dolarLegend ? 'Compra' : 'Aprobado Devengado',
            config: {
              lineWidth: 2,
              circleRadius: 0,
              drawValues: false,
              drawFilled: true,
              colors: [processColor('rgb(215, 81, 116)')],
              fillColor: processColor('rgba(215, 81, 116,0.3)'),
            },
          },
          {
            values: values,
            label: this.props.dolarLegend ? 'Venta' : 'Aprobado Percibido',
            config: {
              lineWidth: 2,
              circleRadius: 0,
              drawValues: false,
              drawFilled: true,
              colors: [processColor('rgb(107, 194, 217)')],
              fillColor: processColor('rgba(107, 194, 217,0.3)'),
            },
          },

        ],
      },

      marker: {
        enabled: true,
        digits: 2,
        markerColor: processColor('black'),
        textColor: processColor('white'),
      },
      xAxis: {
        axisMaximum: this.props.values.length,
        axisMinimum: 0,
        position: 'BOTTOM',
        valueFormatter: labels,
        granularityEnabled: true,
        granularity: 1,
        textColor: processColor('black'),
      },
      yAxis: { 
        left: {
          valueFormatter: 'largeValue',
          textColor: processColor('black'),
          axisLineColor: processColor('black'),
          gridColor: processColor('black'),
          labelCount: 6,
          labelCountForce: true,
        },
        right: {
          enabled: true,
          drawLabels: false,
          drawAxisLine: true,
          axisLineColor: processColor('black'),
          drawGridLines: false,
        },
      },
      viewPortOffsets: {
        left: 50,
        top: 20,
        right: 10,
        bottom: 40,
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            viewPortOffsets={this.state.viewPortOffsets}
            drawGridBackground={false}
            borderColor={processColor('black')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={true}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
        <View>
          <RangeSlider
            style={styles.slider}
            min={0}
            max={this.props.values.length}
            step={10}
            selectionColor={Colors.primaryColor}
            labelStyle="none"
            blankColor="#dedede"
            onValueChanged={(low, high, fromUser) => {
              this.setState({
                xAxis: {
                  ...this.state.xAxis,
                  axisMaximum: high,
                  axisMinimum: low,
                },
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  chart: {
    height: 220,
  },
});

export default WrapperComparativeLineChart;
