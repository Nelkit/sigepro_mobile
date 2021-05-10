import React from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  View,
  Text,
  SectionList,
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import { WorkOrder } from '../../models';
import OrderItem from '../../components/items/OrderItem';
import OrderHeader from '../../components/headers/OrderHeader';
import EmptyBox from '../../components/EmptyBox';

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
    let orders = realm.objects(WorkOrder.name).filtered(`status='in_progress'`);

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
          ListEmptyComponent={ <EmptyBox title={"Sin ordenes en curso"} />}
          SectionSeparatorComponent={()=><View style={{height: 10}} />}
          renderItem={({index, item}) => {
            return (
              <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigate('OrderDetail', item)}>
                <OrderItem 
                  buttonTitle={"Continuar"}
                  didPressButton={() => navigate('OrderDetail', item)}
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
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
  }, 
});

export default TabInProcess;
