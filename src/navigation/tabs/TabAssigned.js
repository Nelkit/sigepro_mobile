import React from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../core/colors';
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import { WorkOrder } from '../../models';
import OrderAssignedItem from '../../components/items/OrderAssignedItem'
let realm;

class TabAssigned extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderList: [],
    };
    realm = new Realm({path: dbPath});
  }

  getWorkOrders(){
    let query = realm.objects(WorkOrder.name);
    this.setState({workOrderList: query});
  }

  componentDidMount() {
    this.getWorkOrders()
  }

  render() {
    const {navigate} = this.props.navigation;
    
    return (
      <SafeAreaView>
        <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.backgroundColor}
        />
        <FlatList
          style={styles.flatList}
          data={this.state.workOrderList}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 5}}
          renderItem={({index, item}) => {
            return (
              <TouchableHighlight
              style={styles.boxSelect}
              underlayColor="transparent"
              onPress={() => navigate('OrderDetail', item)}>
                <OrderAssignedItem 
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingBottom: 22,
  },
  scene: {
    backgroundColor: "#ffffff",
    height: '100%',
  },
  flatList: {
    height: '100%',
  }
});

export default TabAssigned;
