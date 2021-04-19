import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import WrapperBarChart from '../components/WrapperBarChart';
import WrapperPieChart from '../components/WrapperPieChart';
import CardLayout from '../components/CardLayout';
import Colors from '../core/colors';
import Realm from 'realm';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
let realm;

class SummaryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      isFetching: false,
    };

    realm = new Realm({path: localDBPath});
  }

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.getChartData();
    });
  }

  componentDidMount() {
      this.getChartData();
  }

  getChartData() {
    let query = realm.objects(Models.fideicomisoChart.name).sorted('year', true);

    //parseando a JSON
    var chartJSON = JSON.parse(JSON.stringify(query));

    //convirtiendo el JSON en un array para que pueda ser interpretado por los graficos
    var chartArray = [];
    for (var i in chartJSON) {
      var item = chartJSON[i];
      item.values = Object.keys(item.values).map(function(_) {
        return item.values[_];
      });
      chartArray.push(item);
    }

    this.setState({chartData: chartArray});
    this.setState({isFetching: false});
  }

  render() {
    return (
      <View style={styles.scene}>
        <FlatList
          data={this.state.chartData}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 40}}
          renderItem={({item}) => {
            if (item.type === 'pie_chart') {
              return (
                <CardLayout>
                  <View style={styles.body}>
                    <Text style={styles.title}>{item.title}</Text>
                    <WrapperPieChart values={item.values} />
                  </View>
                </CardLayout>
              );
            } else {
              return (
                <CardLayout>
                  <View style={styles.body}>
                    <Text style={styles.title}>{item.title}</Text>
                    <WrapperBarChart values={item.values} />
                  </View>
                </CardLayout>
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: Colors.background,
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default SummaryTab;
