import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { dbPath } from '../core/constants';
import Colors from '../core/colors';
import Models from '../core/models';
import requests from '../services/requests';
import LottieView from 'lottie-react-native';
import CardLayout from '../components/CardLayout';
let realm;

class SyncScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queueStatus: [],
    };

    realm = new Realm({
      path: dbPath,
      schema: [
        Models.WorkOrder,
      ],
      schemaVersion: 1,
      migration: function(oldRealm, newRealm) {

      },
    });
  }

  getWorkOrders() {
    var request = requests.getWorkOrders()
    request.then(work_orders => {
      work_orders.map((item, key)=>{
        realm.write(() => {
          realm.create(Models.WorkOrder.name, item, true);
        });
      })
      this.pushToQueueStatus('Ordenes de trabajo');
    }).catch(error => {
      console.log("RESPUESTA FALLIDA", error)
    })

  }

  getAllData() {
    this.getWorkOrders();
  }

  pushToQueueStatus(title) {
    let queueStatus = [...this.state.queueStatus];

    // Add item to it
    queueStatus.push({title: title});

    // Set state
    this.setState({queueStatus});
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {

    this.getAllData();
  }

  render() {
    return (
      <SafeAreaView>
      <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <CardLayout>
            {this.state.queueStatus.length < 1 && (
              <View style={styles.containerLoading}>
                <LottieView
                  autoSize
                  style={styles.loading}
                  source={require('../assets/lottieFiles/loading.json')}
                  autoPlay
                  loop
                />
              </View>
            )}
            {this.state.queueStatus.length === 1 && (
              <View style={styles.containerCheck}>
                <LottieView
                  autoSize
                  style={styles.check}
                  source={require('../assets/lottieFiles/check.json')}
                  autoPlay
                  loop={false}
                  onAnimationFinish={ this.navigateToHome }
                />
              </View>
            )}
          </CardLayout>
      </ScrollView>
    </SafeAreaView>
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
    color: Colors.primaryText,
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.secondaryText,
    width: '100%',
    textAlign: 'center',
    padding: 20,
  },
  containerButton: {
    padding: 20,
  },
  containerLoading: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  containerCheck: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  loading: {
    width: 250,
    padding: 0,
  },
  check: {
    width: 450,
    padding: 0,
  },
});

export default SyncScreen;
