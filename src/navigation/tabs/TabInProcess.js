import React from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import Colors from '../../core/colors';
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import { WorkOrder } from '../../models';
import OrderItem from '../../components/items/OrderItem'
let realm;

class TabInProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderList: [],
    };
    realm = new Realm({path: dbPath});
  }

  getWorkOrders(){
    let query = realm.objects(WorkOrder.name).filtered(`status='in_progress'`);
    this.setState({workOrderList: query});
  }

  componentDidMount() {
    this.getWorkOrders()
  }

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <FlatList
            style={styles.flatList}
            data={this.state.workOrderList}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 20}}
            renderItem={({index, item}) => {
              return (
                <TouchableHighlight
                style={styles.boxSelect}
                underlayColor="transparent"
                onPress={() => navigate('OrderDetail', item)}>
                  <OrderItem 
                    button_title={"Continuar"}
                    project_name={item.project_name}
                    order_number={item.order_number}
                    hours_by_vehicle={item.hours_by_vehicle}
                    distances_by_work={item.distances_by_work}
                    date={item.created_date}
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
  container: {
    flex: 1,
    height: '100%',
  },
  flatList: {
    paddingVertical: 10,
    height: '100%',
  }
});

export default TabInProcess;
