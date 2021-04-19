import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import Colors from '../core/colors';
import Helpers from '../core/helpers';
import RangeSlider from 'rn-range-slider';

import {BarChart} from 'react-native-charts-wrapper';

class WrapperTransparentBarChart extends React.Component {
  constructor(props) {
    super(props);

    var labels = [];

    for (var i in props.values) {
      var month = Helpers.getMMYYYY(props.values[i].label);
      labels.push(month);
    }

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
        valueFormatter: labels,
        position: 'BOTTOM',
        granularityEnabled: true,
        granularity: 1,
        textSize: 13,
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
      marker: {
        enabled: true,
        markerColor: processColor('white'),
        textColor: processColor('white'),
        markerFontSize: 9,
      },
    };
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            drawGridBackground={false}
            visibleRange={{x: {min: 0, max: 6}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={false}
            highlights={this.state.highlights}
            marker={this.state.marker}
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
  slider: {
    width: '100%',
    height: 30,
  },
  chart: {
    height: 220,
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

export default WrapperTransparentBarChart;
