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
  Text,
  Dimensions
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import TextFont from '../../components/TextFont';
import MaterialButton from '../../components/MaterialButton';
import OrderProgressItem from '../../components/items/OrderProgressItem'
import Divider from '../../components/Divider';
import Pill from '../../components/Pill';
import { dbPath } from '../../core/constants';
import Realm from 'realm';
import { OrderProgress } from '../../models';
import CardLayout from '../../components/CardLayout';
import EmptyBox from '../../components/EmptyBox';
let realm;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ProgressTab = ({ order_progress, params, navigate, didAddOrderProgress }) => {
  const {id, project, status } = params;

  return (
    <View style={styles.progressTabContainer}>
      <View style={styles.headerContainer}>
        <View style={{flex:2}}>
          <TextFont fontSize={20} fontWeight={'bold'}>Avance por maquinaria </TextFont>
        </View>
        <View style={{flex:1}}>    
        {status != 'completed' &&(              
          <MaterialButton 
            title="Agregar"
            backgroundColor={Colors.primaryColor}
            color={Colors.white}
            height={30}
            borderRadius={15}
            paddingHorizontal={15}
            fontSize={18}
            onPress={()=>navigate('AddOrderProgress', {order_id: id, project: project, didAddOrderProgress: didAddOrderProgress})}
          />
        )}
        </View>
      </View>
      <FlatList
        style={styles.flatlist}
        data={order_progress}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={order_progress.length === 0 && styles.centerEmptySet}
        ListEmptyComponent={<EmptyBox title={'Todavia no se ha registrado ningún avance.'} type={'excavator'} />}
        renderItem={({index, item}) => {
          item.order_status = status
          
          return (
            <TouchableHighlight
              style={styles.boxSelect}
              underlayColor="transparent"
              onPress={() => navigate('OrderProgress', item)}>
                <OrderProgressItem 
                  vehicle_name = {item.vehicle_name}
                  vehicle_code = {item.vehicle_code}
                  vehicle_driver_name = {item.vehicle_driver_name}
                  is_uploaded = {item.is_uploaded}
                />
            </TouchableHighlight>
          );
        }}
      />
    </View>
  )
}

const DetailTab = ({ props }) => {
  const {project_name, order_number, distances_by_work, hours_by_vehicle, date} = props;

  return (
    <View style={{paddingTop: 15}}>
      <CardLayout>
        <View style={styles.cardbody}>
          <TextFont fontSize={18}>
            <TextFont fontWeight={'bold'}>Proyecto: </TextFont>{project_name}
          </TextFont>
          <Divider/>
          <TextFont fontSize={18}>
            <TextFont fontWeight={'bold'}>Orden: </TextFont>#{order_number}
          </TextFont>
          <Divider/>
          <TextFont fontSize={18} fontWeight={'bold'}>Kilometros por tramo: </TextFont>
          <FlatList
              style={styles.pillList}
              data={distances_by_work}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({index, item}) => {
                return (
                  <Pill title={item.work_type_title} value={`${item.distance} KM`} color={item.work_type_color} />
                );
              }}
          />
          <TextFont fontSize={18} fontWeight={'bold'}>Horas por Maquinaria: </TextFont>
          <FlatList
            style={styles.flatlist}
            data={hours_by_vehicle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({index, item}) => {
              return (
                <Text>{item.hours} Hrs {item.vehicle_data.title}</Text>
              );
            }}
          />
          <Divider/>
          <View style={styles.bottom}>
              <Image
                style={styles.dateIcon}
                source={require('../../assets/images/icons/ic_calendar.png')}
              />
              <Text style={styles.datetext}>{Helpers.getDateFromNow(date)}</Text>
          </View>
        </View>
      </CardLayout>
    </View>
  )
}

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_progress: [],
      index: 0,
      routes: [
        {key: 'first', title: 'Avance'},
        {key: 'second', title: 'Detalles'},
      ],
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
    const { project_name, order_number, status, status_str } = params;
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
                <TextFont fontWeight={'bold'} style={styles.textbold}>Orden: </TextFont>#{order_number}
              </TextFont>
              <Divider/>
              <View style={styles.statusContainer}>
                <TextFont fontSize={18} fontWeight={'bold'}>Estado: </TextFont>
                {status=='assigned' && <Pill title={status_str} color={'2112FE'}/>}
                {status=='in_progress' && <Pill title={status_str} color={'FFB531'}/>}
                {status=='completed' && <Pill title={status_str} color={'217612'}/>}
              </View>
              <View style={styles.divider} />
            </View>
            <TabView
              swipeEnabled={true}
              navigationState={this.state}
              renderScene={({route}) => {
                switch (route.key) {
                  case 'first':
                    return <ProgressTab order_progress={order_progress} params={params} navigate={navigate} didAddOrderProgress={this.didAddOrderProgress} />;
                  case 'second':
                    return <DetailTab props={params} />;
                  default:
                    return null;
                }
              }}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  activeColor={Colors.primaryColor}
                  inactiveColor={Colors.secondaryText}
                  indicatorStyle={{backgroundColor: Colors.secondaryColor, height: 5}}
                  style={{backgroundColor: Colors.white}}
                  scrollEnabled={false}
                />
              )}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width}}
            />
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
  boxHeader: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop:20,
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
  flatlist: {
    paddingBottom: 15,
  },
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
  }, 
  cardbody:{
    padding: 20,
  },
  dateIcon: {
    width: 20,
    height: 20,
    marginRight: 7,
  },
  bottom:{
    flexDirection: "row",
    display: 'flex',
    alignItems: 'center',
  },
  pillList: {
    marginTop: 5,
    marginBottom: 10,
  },
  divider: {
    marginTop: 15,
    backgroundColor: "#F2F2F2",
    height: 2,
    width: "100%"
  },
  progressTabContainer:{
    height: '100%'
  }
});

export default OrderDetail;
