import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableHighlight, SectionList} from 'react-native';
import Colors from '../core/colors';
import Realm from 'realm';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import SectorCell from '../components/SectorCell';

let realm;

class PromesasTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      isFetching: false,
      modalVisible: false,
      historyData: [],

      searchText: '',
      sectoresData: [],
      filteredData: [],
      title: '',
      indexChecked: -1,
    };

    realm = new Realm({path: localDBPath});
  }

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.getSectoresData();
    });
  }

  componentDidMount() {
      this.getSectoresData();
  }

  getSectoresData() {
    let sectores = [];
    for (let sector of realm.objects(Models.sectores.name)) {
      let programas = [];

      for (let programa of sector.programas) {
        programas.push({
          id: programa.id_programa,
          title: programa.descripcion_programa,
        });
      }

      sectores.push({
        id: sector.id_sector,
        title: sector.descripcion_sector,
        image: sector.img_sector,
        color: sector.color,
        data: programas,
      });
    }

    this.setState({sectoresData: sectores});

    console.log('DATAA', sectores);
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

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <View style={styles.scene}>
        <FlatList
          data={this.state.sectoresData}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 5}}
          renderItem={({index, item}) => {
            return (
              <TouchableHighlight
              style={styles.boxSelect}
              underlayColor="transparent"
              onPress={() => navigate('Programa', item)}>
                <SectorCell
                  navigation={this.props.navigation}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                />
            </TouchableHighlight>
            );
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default PromesasTab;
