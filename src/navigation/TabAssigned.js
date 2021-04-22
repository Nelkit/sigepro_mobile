import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../core/colors';
import Realm from 'realm';
import { dbPath } from '../core/constants';
import Models from '../core/models';
import OrderAssignedItem from '../components/items/OrderAssignedItem'
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
    let query = realm.objects(Models.WorkOrder.name);
    this.setState({workOrderList: query});
  }

  componentDidMount() {
    this.getWorkOrders()
  }

  render() {
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
              <OrderAssignedItem 
                project_name={item.project_name}
                order_number={item.order_number}
                date={item.created_date}
              />
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
