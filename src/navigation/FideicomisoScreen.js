import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import FideicomisoDetailCell from '../components/FideicomisoDetailCell';
import SearchField from '../components/SearchField';
import Colors from '../core/colors';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
let realm;
class FideicomisoScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
    title: 'Fideicomisos',
  });

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      fideicomisosData: [],
      filteredData: [],
      title: '',
    };
    //Bind Actions
    realm = new Realm({path: localDBPath});
  }

  componentDidMount() {
    this.getFideicomisosData();
  }

  getFideicomisosData() {
    const {navigation} = this.props;
    this.setState({title: navigation.getParam('title')});

    var type = navigation.getParam('type');
    var year = navigation.getParam('year');
    let query =
      type === '2'
        ? realm
            .objects(Models.fideicomiso.name)
            .filtered('type = "' + type + '" AND year = "' + year + '"')
        : realm
            .objects(Models.fideicomiso.name)
            .filtered('type = "' + type + '" AND year = "' + year + '"');

    //parseando a JSON
    var json = JSON.parse(JSON.stringify(query));

    //convirtiendo el JSON en un array
    var arrayData = Object.keys(json).map(function(_) {
      return json[_];
    });
    console.log('JSON', arrayData);

    this.setState({fideicomisosData: arrayData});
  }

  search = searchText => {
    this.setState({searchText: searchText});

    let filteredData = this.state.fideicomisosData.filter(function(item) {
      return item.descripcion.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({filteredData: filteredData});
  };

  render() {
    const {navigate} = this.props.navigation;

    console.log(this.props);

    return (
      <View style={styles.scene}>
        <Text style={styles.title}>{this.state.title}</Text>
        <FlatList
          style={styles.flatlist}
          data={
            this.state.filteredData && this.state.filteredData.length > 0
              ? this.state.filteredData
              : this.state.fideicomisosData
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
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigate('FideicomisoDetail', item)}>
              <FideicomisoDetailCell {...item} />
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

export default FideicomisoScreen;
