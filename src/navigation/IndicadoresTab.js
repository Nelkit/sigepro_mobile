import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import WrapperLineChart from '../components/WrapperLineChart';
import WrapperTransparentBarChart from '../components/WrapperTransparentBarChart';
import WrapperComparativeLineChart from '../components/WrapperComparativeLineChart';
import CardLayout from '../components/CardLayout';
import ModalLayout from '../components/ModalLayout';
import Colors from '../core/colors';
import Realm from 'realm';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import FastImage from 'react-native-fast-image';
let realm;

class IndicadoresTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idSectorSelected: 1,
      chartData: [],
      sefinChartData: [], 
      isFetching: false,
      modalVisible: false,
      historyData: [],
      sectoresData: [],
    };

    realm = new Realm({path: localDBPath});
  }

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.getChartData(this.state.idSectorSelected);
      this.getSefinChartData(this.state.idSectorSelected);
    });
  }

  componentWillMount() {
      this.getSectoresData();
      this.getChartData(this.state.idSectorSelected);
      this.getSefinChartData(this.state.idSectorSelected);
  }

  getSefinChartData(id_sector) {
    let query = realm.objects(Models.sefinChart.name).filtered('id_sector = ' + id_sector);

    //parseando a JSON
    var chartJSON = JSON.parse(JSON.stringify(query));

    console.log(chartJSON);

    //convirtiendo el JSON en un array para que pueda ser interpretado por los graficos
    var chartArray = [];
    for (var i in chartJSON) {
      var item = chartJSON[i];
      item.Values = Object.keys(item.Values).map(function(_) {
        return item.Values[_];
      });
      chartArray.push(item);
    }

    this.setState({sefinChartData: chartArray});
    this.setState({isFetching: false});
  }

  getChartData(id_sector) {
    let query = realm.objects(Models.macrosChart.name).filtered('id_sector = ' + id_sector);

    //parseando a JSON
    var chartJSON = JSON.parse(JSON.stringify(query));

    console.log(chartJSON);

    //convirtiendo el JSON en un array para que pueda ser interpretado por los graficos
    var chartArray = [];
    for (var i in chartJSON) {
      var item = chartJSON[i];
      item.Values = Object.keys(item.Values).map(function(_) {
        return item.Values[_];
      });
      chartArray.push(item);
    }

    this.setState({chartData: chartArray});
    this.setState({isFetching: false});
  }

  getSectoresData(){
    let query = realm.objects(Models.sectorIndicador.name);

    var sectores = []
    query.map(function(item){
      sectores.push({'label':item.sector,'value':item.id_sector})
    })

    this.setState({sectoresData: sectores});
  }

  stringToArray(str) {
    var arrayColor = new Array();
    arrayColor = str.split(',');
    return arrayColor;
  }

  showModal(values) {
    this.setState({modalVisible: true});
    this.setState({historyData: values});
  }

  onPickerChange = (id_sector) => {
    this.setState({idSectorSelected: id_sector})
    this.getChartData(id_sector)
    this.getSefinChartData(id_sector)
  }

  render() {
    return (
      <View style={styles.scene}>

        <View style={styles.pickerBox}>
          <RNPickerSelect
              style={{
                ...styles.picker,
              }}
              value={this.state.idSectorSelected}
              useNativeAndroidPickerStyle={false}
              onValueChange={this.onPickerChange}
              items={this.state.sectoresData}
              Icon={() => {
                return <Image style={styles.chevronIcon} source={require('../assets/icons/ic_bottom_arrow.png')}  />;
              }}
          />
        </View>
        
        <ScrollView>
          <FlatList
            data={this.state.sefinChartData}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 5}}
            renderItem={({index, item}) => {
              return (
                <CardLayout>
                  <View style={styles.body}>
                    <Text style={styles.titleSefin}>{item.Macro}</Text>
                    <WrapperComparativeLineChart
                      dolarLegend={item.Macro.includes('$')}
                      style={styles.chart}
                      values={item.Values}
                      values2={item.Values2}
                    />
                  </View>
                </CardLayout>
              );
            }}
          />

          <FlatList
            data={this.state.chartData}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 40}}
            renderItem={({index, item}) => {
              return (
                <CardLayout>
                  <LinearGradient
                    start={{x: 1.2, y: 0.0}}
                    end={{x: 0.0, y: 1.0}}
                    colors={this.stringToArray(item.Color)}
                    style={styles.body}>
                    <Text style={styles.title}>{item.Macro}</Text>
                    <TouchableOpacity
                      style={styles.historyButton}
                      onPress={() => this.showModal(item.Values)}>
                      <Image
                        style={styles.historyImage}
                        source={require('../assets/icons/ic_search_gray.png')}
                      />
                    </TouchableOpacity>
                    { item.tipo_graph == 'B'
                      ? <WrapperTransparentBarChart style={styles.chart} values={item.Values} />
                      : <WrapperLineChart style={styles.chart} values={item.Values} />
                    }
                    
                  </LinearGradient>
                </CardLayout>
              );
            }}
          />
        </ScrollView>   

        <ModalLayout
          modalVisible={this.state.modalVisible}
          onPressDismissButton={() => this.setState({modalVisible: false})}
          historyData={this.state.historyData}
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
    color: 'white',
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
    borderRadius: 8,
  },
  imageBG: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    marginLeft: -20,
    marginTop: -20,
    opacity: 0.2,
  },
  chart: {
    position: 'relative',
  },
  historyButton: {
    position: 'absolute',
    display: 'flex',
    right: 12,
    top: 12,
    height: 30,
    width: 30,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 6,
    elevation: 7,
  },
  historyImage: {
    width: 15,
    height: 15,
  },
  pickerBox: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  picker: {
    backgroundColor: 'red',
    height: 50,
    width: '100%'
  },
  chevronIcon:{
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  titleSefin: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IndicadoresTab;
