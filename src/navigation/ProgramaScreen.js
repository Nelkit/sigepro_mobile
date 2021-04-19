import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import Colors from '../core/colors';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
import ProgramaCell from '../components/ProgramaCell'
let realm;

class ProgramaScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
    title: 'Programas',
  });

  constructor(props) {
    super(props);
    this.state = {
      programasData: [],
      title: [],
    };
    //Bind Actions
    realm = new Realm({path: localDBPath});
  }

  componentDidMount() {
    this.getProgramasData();
  }
  
  getProgramasData() {
    const {navigation} = this.props;
    var id = navigation.getParam('id');
    var title = navigation.getParam('title');

    console.log(title);
    let query = realm
      .objects(Models.programas.name)
      .filtered('id_sector = "' + id + '"');

    console.log(query);
    this.setState({title: title});
    this.setState({programasData: query});
  }

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <View style={styles.scene}>
        <Text style={styles.title}>{this.state.title}</Text>

        <FlatList
          style={styles.flatlist}
          data={this.state.programasData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 40}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => navigate('Indicadores', item)}>
              <ProgramaCell
                title={ item.descripcion_programa }
                porcentaje={ item.porcentaje }
                isLastItem={ index === this.state.programasData.length - 1 }
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
  body: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  containerChart: {
    height: 'auto',
    paddingBottom: 5,
  },
  flatlist: {
    height: 'auto',
    paddingBottom: 5,
  },
});

export default ProgramaScreen;
