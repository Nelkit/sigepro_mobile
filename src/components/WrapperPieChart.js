import React from 'react';
import {StyleSheet, View, Text, processColor} from 'react-native';
import Colors from '../core/colors';

import {PieChart} from 'react-native-charts-wrapper';

class WrapperPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legend: {
        enabled: true,
        textSize: 9,
        form: 'CIRCLE',
        horizontalAlignment: 'LEFT',
        verticalAlignment: 'BOTTOM',
        orientation: 'HORIZONTAL',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: props.values,
            label: '',
            config: {
              colors: Colors.chartColors,
              drawValues: false,
              sliceSpace: 2,
              selectionShift: 13,
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      chartHeight: props.values.length <= 10 ? 300 : 24 * props.values.length,
      marker: {
        enabled: true,
        markerColor: processColor('#000'),
        textColor: processColor('white'),
        markerFontSize: 9,
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
      <View style={styles.container}>
        <PieChart
          style={{height: this.state.chartHeight}}
          logEnabled={true}
          data={this.state.data}
          legend={this.state.legend}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={6}
          drawEntryLabels={false}
          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={true}
          centerTextRadiusPercent={100}
          holeRadius={40}
          transparentCircleRadius={45}
          maxAngle={350}
          onSelect={this.handleSelect.bind(this)}
          onChange={event => console.log(event.nativeEvent)}
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

export default WrapperPieChart;
