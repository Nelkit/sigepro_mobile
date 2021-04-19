import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import IndicadorCell from '../components/IndicadorCell';
import SearchField from '../components/SearchField';
import Colors from '../core/colors';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
let realm;
class IndicadoresScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
    title: 'Indicadores',
  });

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      indicadoresData: [],
      filteredData: [],
      title: '',
    };
    //Bind Actions
    realm = new Realm({path: localDBPath});
  }

  componentDidMount() {
    this.getIndicadoresData();
  }

  getIndicadoresData() {
    const {navigation} = this.props;
    this.setState({title: navigation.getParam('descripcion_programa')});

    var id_programa = navigation.getParam('id_programa');

    let query = realm
      .objects(Models.indicadores.name)
      .filtered('id_programa = "' + id_programa + '"')
      .sorted('nombre_indicador', false);

    //parseando a JSON
    var json = JSON.parse(JSON.stringify(query));

    //convirtiendo el JSON en un array
    var arrayData = Object.keys(json).map(function(_) {
      return json[_];
    });
    console.log('JSON', arrayData);

    this.setState({indicadoresData: arrayData});
  }

  search = searchText => {
    this.setState({searchText: searchText});

    let filteredData = this.state.indicadoresData.filter(function(item) {
      return item.nombre_indicador
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    this.setState({filteredData: filteredData});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;

    console.log(navigation.getParam('id_programa'));

    return (
      <View style={styles.scene}>
        <Text style={styles.title}>{this.state.title}</Text>
        <FlatList
          style={styles.flatlist}
          data={
            this.state.filteredData && this.state.filteredData.length > 0
              ? this.state.filteredData
              : this.state.indicadoresData
          }
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 40}}
          ListHeaderComponent={
            <View>
              <SearchField
                onChangeText={this.search}
                placeholder="Buscar por nombre"
                value={this.state.searchText}
              />
            </View>
          }
          renderItem={({item, key}) => (
            <TouchableOpacity onPress={() => navigate('Avances', item)}>
              <IndicadorCell key={key} {...item} />
            </TouchableOpacity>
          )}
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
  flatlist: {
    zIndex: 0,
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
    textAlign: 'center',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
});

export default IndicadoresScreen;
