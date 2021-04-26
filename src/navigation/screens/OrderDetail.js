import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  LogBox,
  Image,
  Text
} from 'react-native';
import Colors from '../../core/colors';
import TextFont from '../../components/TextFont';
import MaterialButton from '../../components/MaterialButton';
import OrderProgressItem from '../../components/items/OrderProgressItem'
import Divider from '../../components/Divider';
import Pill from '../../components/Pill';
import { dbPath } from '../../core/constants';
import Realm from 'realm';
import { OrderProgress } from '../../models';
let realm;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_progress: [],
    };

    realm = new Realm({path: dbPath});
  }

  componentDidMount() {
    this.getOrderProgress()
  }

  getOrderProgress = () =>{
    const { params } = this.props.route
    const { id } = params;

    let progress = realm.objects(OrderProgress.name).filtered(`work_order = ${id}`);
    this.setState({order_progress: progress})
  }

  didAddOrderProgress = () => {
    this.getOrderProgress()
  };

  render() {
    const {navigate} = this.props.navigation;
    const { params } = this.props.route
    const {id, project_name, order_number, status, status_str, project} = params;
    const {order_progress} = this.state;

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.wrapper}>
            <View style={styles.boxHeader}>
              <TextFont fontSize={18}>
                <TextFont fontWeight={'bold'} style={styles.textbold}>Proyecto: </TextFont>{project_name}
              </TextFont>
              <Divider/>
              <TextFont fontSize={18}>
                <TextFont fontWeight={'bold'} style={styles.textbold}>Orden: </TextFont>#{order_number}
              </TextFont>
              <Divider/>
              <View style={styles.statusContainer}>
                <TextFont fontSize={18} fontWeight={'bold'}> Estado: </TextFont>
                {status=='in_progress' && <Pill title={status_str} color={'FFB531'}/>}
                {status=='completed' && <Pill title={status_str} color={'217612'}/>}
              </View>
            </View>
            <View style={styles.headerContainer}>
              <View style={{flex:2}}>
                <TextFont fontSize={20} fontWeight={'bold'}>Avance por maquinaria </TextFont>
              </View>
              <View style={{flex:1}}>                  
                <MaterialButton 
                  title="Agregar"
                  backgroundColor={Colors.primaryColor}
                  color={Colors.white}
                  height={30}
                  borderRadius={15}
                  paddingHorizontal={15}
                  fontSize={18}
                  onPress={()=>navigate('AddOrderProgress', {order_id: id, project: project, didAddOrderProgress: this.didAddOrderProgress})}
                />
              </View>
            </View>
            {order_progress.length === 0 ? (
              <View style={styles.emptyBox}>
                <View style={styles.emptyBody}>
                  <Image
                    style={styles.emptyIcon}
                    source={require('../../assets/images/icons/ic_excavator_placeholder.png')}
                  />
                  <Text style={styles.emptyLabel}>Todavia no se ha registrado ningún avance.</Text>
                </View>
              </View>
            ):(
              <FlatList
                data={order_progress}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({index, item}) => {
                  return (
                    <TouchableHighlight
                      style={styles.boxSelect}
                      underlayColor="transparent"
                      onPress={() => navigate('OrderProgress', item)}>
                        <OrderProgressItem 
                          vehicle_name = {item.vehicle_name}
                          vehicle_code = {item.vehicle_code}
                          vehicle_driver_name = {item.vehicle_driver_name}
                        />
                    </TouchableHighlight>
                  );
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: Colors.background,
  },
  scrollView: {
    height: '100%',
  },
  boxHeader: {
    backgroundColor: Colors.white,
    padding: 20,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  statusContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerContainer:{
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  emptyBox:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  emptyBody:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon:{
    height: 150,
    width: 150,
  },
  emptyLabel:{
    paddingTop: 20,
    color: Colors.secondaryText,
  }
});

export default OrderDetail;
