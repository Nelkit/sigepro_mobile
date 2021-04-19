import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FideicomisoCell from '../components/FideicomisoCell';
import {localDBPath} from '../core/constants';
import Colors from '../core/colors';
import Helpers from '../core/helpers';
import Models from '../core/models';
import Realm from 'realm';
let realm;

class TypeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fideicomisosData: [],
      isFetching: false,
    };

    realm = new Realm({path: localDBPath});
  }

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.getFideicomisosData();
    });
  }

  componentDidMount() {
      this.getFideicomisosData();
  }

  getFideicomisosData() {
    let query = realm.objects(Models.typeFideicomiso.name).sorted('year', true);

    //parseando a JSON
    var json = JSON.parse(JSON.stringify(query));

    //convirtiendo el JSON en un array
    var arrayData = Object.keys(json).map(function(_) {
      return json[_];
    });

    this.setState({fideicomisosData: arrayData});
    this.setState({isFetching: false});
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.scene}>
        <FlatList
          data={this.state.fideicomisosData}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 40}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigate('Fideicomiso', item)}>
              <FideicomisoCell
                icon={require('../assets/icons/ic_chart.png')}
                title={item.title}
                subtitle={Helpers.getDateFromNow(item.last_update)}
              />
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
});

export default TypeTab;
