import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import FideicomisoProgramCell from '../components/FideicomisoProgramCell';
import Colors from '../core/colors';
import WrapperBarChart from '../components/WrapperBarChart';
import CardLayout from '../components/CardLayout';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
let realm;

class FideicomisoDetailScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      fideicomisoData: [],
      chartData: [],
      title: [],
    };
    //Bind Actions
    realm = new Realm({path: localDBPath});
  }

  componentDidMount() {
    this.getFideicomisosData();
  }

  getFideicomisosData() {
    const {navigation} = this.props;
    var id = navigation.getParam('id');

    console.log(id);
    let query = realm
      .objects(Models.fideicomisoDetail.name)
      .filtered('id = "' + id + '"');

    this.setState({title: [query.descripcion]});

    for (var i in query) {
      var item = query[i];
      var components = Object.keys(item.components).map(function(_) {
        return item.components[_];
      });

      var values = Object.keys(item.values).map(function(_) {
        return item.values[_];
      });

      this.setState({fideicomisoData: components});
      this.setState({chartData: [values]});
      this.setState({title: item.descripcion});
    }
  }

  render() {
    return (
      <View style={styles.scene}>
        <FlatList
          data={this.state.fideicomisoData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 40}}
          ListHeaderComponent={
            <View style={styles.containerChart}>
              <FlatList
                style={styles.flatlist}
                scrollEnabled={false}
                data={this.state.chartData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <CardLayout>
                      <View style={styles.body}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <WrapperBarChart values={item} />
                      </View>
                    </CardLayout>
                  );
                }}
              />
            </View>
          }
          renderItem={({item}) => <FideicomisoProgramCell  item={item} />}
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
  containerChart: {
    height: 'auto',
    paddingBottom: 5,
  },
  flatlist: {
    height: 'auto',
    paddingBottom: 5,
  },
});

export default FideicomisoDetailScreen;
