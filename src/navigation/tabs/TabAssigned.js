import React from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  SectionList,
  View,
  Alert
} from 'react-native';
import Colors from '../../core/colors';
import Realm from 'realm';
import { dbPath } from '../../core/constants';
import Helpers from '../../core/helpers';
import { WorkOrder } from '../../models';
import OrderItem from '../../components/items/OrderItem'
import OrderHeader from '../../components/headers/OrderHeader';
import EmptyBox from '../../components/EmptyBox'
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
    let orders = realm.objects(WorkOrder.name).filtered(`status='assigned'`);
    
    const grouped = Helpers.groupBy(orders, 'project_name');
    this.setState({workOrderList: grouped});
  }

  didPressStartButton = (id) => {
    let orders = realm.objects(WorkOrder.name).filtered(`id='${id}'`);
    if(orders.length > 0){
      let order = orders[0]
      Alert.alert(
        `Orden #${order.order_number}`,
        "¿Realmente deseas comenzar a trabajar esta orden?",
        [
          { text: "Cancelar", onPress: () => {}, style: "cancel" },
          { text: "Si", onPress: () => this.startWorkOrder(order) }
        ]
      )
    }
  }

  startWorkOrder = (workOrder)=>{
    const {navigate} = this.props.navigation;

    realm.write(() => {
      workOrder.status = "in_progress"
      workOrder.status_str = "En Curso"
      workOrder.has_changes = true
    });

    this.getWorkOrders()
    navigate('OrderDetail', workOrder)
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
          ListEmptyComponent={ <EmptyBox title={"Sin ordenes asignadas"} />}
          SectionSeparatorComponent={()=><View style={{height: 10}} />}
          renderItem={({index, item}) => {
            return (
              <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {}}>
                <OrderItem
                  id={item.id}
                  buttonTitle={"Comenzar"} 
                  didPressButton={this.didPressStartButton}
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

export default TabAssigned;
