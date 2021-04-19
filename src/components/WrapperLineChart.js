import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';
import Helpers from '../core/helpers';
import Colors from '../core/colors';
import RangeSlider from 'rn-range-slider';

import {LineChart} from 'react-native-charts-wrapper';

class WrapperLineChart extends React.Component {
  constructor(props) {
    super(props);

    var labels = [];
    var values = [];

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

    this.state = {
      legend: {
        enabled: false,
      },
      data: {
        dataSets: [
          {
            values: values,
            label: '',
            config: {
              drawValues: false,
              colors: [processColor('white')],
            },
          },
        ],
      },

      marker: {
        enabled: true,
        digits: 2,
        markerColor: processColor('#000000'),
        textColor: processColor('white'),
      },
      xAxis: {
        position: 'BOTTOM',
        valueFormatter: labels,
        granularityEnabled: true,
        granularity: 1,
        textColor: processColor('white'),
      },
      yAxis: {
        left: {
          textColor: processColor('white'),
          axisLineColor: processColor('white'),
          gridColor: processColor('white'),
          labelCount: 6,
          labelCountForce: true,
        },
        right: {
          enabled: true,
          drawLabels: false,
          drawAxisLine: true,
          axisLineColor: processColor('white'),
          drawGridLines: false,
        },
      },
      viewPortOffsets: {
        left: 30,
        top: 20,
        right: 30,
        bottom: 30,
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
      <View style={{flex: 1}}>
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
            borderColor={processColor('white')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={false}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={true}
            pinchZoom={false}
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
            step={1}
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

export default WrapperLineChart;
