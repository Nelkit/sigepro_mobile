import React from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  SectionList,
  View,
} from 'react-native';
import Helpers from '../../core/helpers';
import Colors from '../../core/colors';
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import { WorkOrder } from '../../models';
import OrderItem from '../../components/items/OrderItem'
import OrderHeader from '../../components/headers/OrderHeader';
import EmptyBox from '../../components/EmptyBox';
let realm;

class TabCompleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workOrderList: [],
    };
    realm = new Realm({path: dbPath});
  }

  getWorkOrders(){
    let orders = realm.objects(WorkOrder.name).filtered(`status='completed'`);

    const grouped = Helpers.groupBy(orders, 'project_name');
    this.setState({workOrderList: grouped});
  }

  componentDidMount() {
    this.getWorkOrders()
  }

  render() {
    const {navigate} = this.props.navigation;
    const {workOrderList} = this.state;
    
    return (
      <View style={styles.container}>
        <SectionList
          sections={workOrderList}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { title } }) => (
            <OrderHeader projectName={title} />
          )}
          stickySectionHeadersEnabled={true}
          contentContainerStyle={workOrderList.length === 0 ? styles.centerEmptySet : {paddingBottom: 20}}
          ListEmptyComponent={ <EmptyBox title={"Sin ordenes completadas"} />}
          SectionSeparatorComponent={()=><View style={{height: 10}} />}
          renderItem={({index, item}) => {
            return (
              <TouchableHighlight
              style={styles.boxSelect}
              underlayColor="transparent"
              onPress={() => navigate('OrderDetail', item)}>
                <OrderItem 
                  buttonTitle={""}
                  didPressButton={() => {}}
                  orderNumber={item.order_number}
                  hoursByVehicle={item.hours_by_vehicle}
                  distancesByWork={item.distances_by_work}
                  date={item.created_date}
                  isUploaded={!item.has_changes}
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
  },
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
  }, 
});

export default TabCompleted;
