import React from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView, Alert} from 'react-native';
import Api from '../services/api';
import Colors from '../core/colors';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import {localDBPath} from '../core/constants';
import Models from '../core/models';
import Realm from 'realm';
import CardLayout from '../components/CardLayout';
import SyncCell from '../components/SyncCell';
let realm;

class SyncScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerRight: <View style={{height: 50, width: 50}} />,
    headerLeft: <View style={{height: 50, width: 50}} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      queueStatus: [],
    };

    //Bind Actions
    this.getChartData = this.getChartData.bind(this);

    realm = new Realm({
      path: localDBPath,
      schema: [
        Models.chartValues,
        Models.fideicomisoChart,
        Models.typeFideicomiso,
        Models.fideicomiso,
        Models.components,
        Models.fideicomisoDetail,
        Models.profile,
        Models.macrosChart,
        Models.sefinChart,
        Models.sectorIndicador,
  
        Models.programas,
        Models.sectores,
        Models.indicadores,
        Models.avances,
      ],
      schemaVersion: 5,
      migration: function(oldRealm, newRealm) {
        if (oldRealm.schemaVersion < 3) {
          const oldObjects = oldRealm.objects('FideicomisoChart');
          const newObjects = newRealm.objects('FideicomisoChart');

          // loop through all objects and set the name property in the new schema
          for (let i = 0; i < oldObjects.length; i++) {
            newObjects[i].year = '';
          }
        }
      },
    });
  }

  pushToQueueStatus(title) {
    let queueStatus = [...this.state.queueStatus];

    // Add item to it
    queueStatus.push({title: title});

    // Set state
    this.setState({queueStatus});
  }

  async getMacrosData(token) {
    var responseData = await Api.getMacros(token);
    responseData.map(function(macro, key) {
      realm.write(() => {
        realm.create(Models.macrosChart.name, macro, true);
      });
    });
    this.pushToQueueStatus('Datos de Macros Económicos');
  }

  async getSefinDatos(token) {
    var responseData = await Api.getSefinDatos(token);
    responseData.map(function(sefinDatos, key) {
      realm.write(() => {
        realm.create(Models.sefinChart.name, sefinDatos, true);
      });
    });
    this.pushToQueueStatus('Datos de SEFIN');
  }

  async getChartData(token) {
    var responseData = await Api.getSummaryChartData(token);
    responseData.map(function(chart, key) {
      realm.write(() => {
        chart.id = key;
        realm.create(Models.fideicomisoChart.name, chart, true);
      });
    });
    this.pushToQueueStatus('Datos de Graficos');
  }

  async getTypesFideicomisos(token) {
    var responseData = await Api.getFideicomisosData(token);
    responseData.map(function(data, key) {
      realm.write(() => {
        data.id = key;
        realm.create(Models.typeFideicomiso.name, data, true);
      });
    });
    this.pushToQueueStatus('Tipos de Fideicomisos');
  }

  async getProfile(token) {
    var responseData = await Api.getProfile(token);
    realm.write(() => {
      console.log(responseData);
      realm.create(Models.profile.name, responseData, true);
    });
    this.pushToQueueStatus('Información de Perfil');
  }

  async getFideicomisoData(token) {
    //Se obtiene la data para fideicomisos del tipo fina
    var fideicomisoFinaResponse = await Api.getFideicomisoDetailData(
      'fideicomiso_fina',
      '0',
      token,
    );
    fideicomisoFinaResponse.map(function(data, key) {
      realm.write(() => {
        data.type = '2';
        realm.create(Models.fideicomiso.name, data, true);
      });
    });
    this.pushToQueueStatus('Detalles de Fideicomisos Fina');

    //Se obtiene la data para fideicomisos del tipo 3%
    var fideicomiso3Response = await Api.getFideicomisoDetailData(
      'fideicomiso3',
      '0',
      token,
    );
    fideicomiso3Response.map(function(data, key) {
      realm.write(() => {
        data.type = '1';
        realm.create(Models.fideicomiso.name, data, true);
      });
    });
    this.pushToQueueStatus('Detalles de Fideicomisos 3%');
  }

  async getFideicomisoDetailData(token) {
    //Se obtiene la data para fideicomisos del tipo fina
    var fideicomisoFinaResponse = await Api.getFideicomisoComponentsData(
      'fideicomiso_fina_detalle',
      token,
    );
    fideicomisoFinaResponse.map(function(data, key) {
      realm.write(() => {
        realm.create(Models.fideicomisoDetail.name, data, true);
      });
    });
    this.pushToQueueStatus('Componentes de Fideicomisos Fina');

    //Se obtiene la data para fideicomisos del tipo 3%
    var fideicomiso3Response = await Api.getFideicomisoComponentsData(
      'fideicomiso3_detalle',
      token,
    );
    fideicomiso3Response.map(function(data, key) {
      realm.write(() => {
        realm.create(Models.fideicomisoDetail.name, data, true);
      });
    });
    this.pushToQueueStatus('Componentes de Fideicomisos 3%');

    let query = realm.objects(Models.fideicomisoDetail.name);
    var json = JSON.parse(JSON.stringify(query));
    console.log('JSON', json);
  }

  async getSectoresIndicadoresDatos(token) {
    var responseData = await Api.getSectoresIndicadoresDatos(token);
    responseData.map(function(data, key) {
      realm.write(() => {
        realm.create(Models.sectorIndicador.name, data, true);
      });
    });
    this.pushToQueueStatus('Sectores de Indicadores');
  }

  async getSectoresData(token) {
    var responseData = await Api.getSectores(token);
    responseData.map(function(sector, key) {
      realm.write(() => {
        realm.create(Models.sectores.name, sector, true);
      });
    });
    this.pushToQueueStatus('Datos de Sectores');
  }

  async getIndicadoresData(token) {
    var responseData = await Api.getIndicadores(token);
    responseData.map(function(indicador, key) {
      realm.write(() => {
        realm.create(Models.indicadores.name, indicador, true);
      });
    });
    this.pushToQueueStatus('Datos de Indicadores');
  }

  async getAvancesData(token) {
    var responseData = await Api.getAvances(token);
    responseData.map(function(avance, key) {
      realm.write(() => {
        realm.create(Models.avances.name, avance, true);
      });
    });
    this.pushToQueueStatus('Datos de Avances');
  }

  async getAllData() {
    try {
      const token = await AsyncStorage.getItem('token');
      this.getProfile(token);
      this.getChartData(token);
      this.getTypesFideicomisos(token);
      this.getFideicomisoData(token);
      this.getFideicomisoDetailData(token);
      this.getMacrosData(token);
      this.getSefinDatos(token);
      this.getSectoresIndicadoresDatos(token);
      this.getSectoresData(token);
      this.getIndicadoresData(token);
      this.getAvancesData(token);
    } catch (error) {
      // Error retrieving data
    }
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {

    this.getAllData();
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.scene}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <CardLayout>
            {this.state.queueStatus.length < 13 && (
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
            {this.state.queueStatus.length === 13 && (
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
            <Text style={styles.title}>Espere un momento...</Text>
            <Text style={styles.subtitle}>
              La aplicación esta realizando una sincronización de los datos
              locales con el servidor solo tardara unos segundos
            </Text>
            <Text style={styles.title}>
              {this.state.queueStatus.length} de 13
            </Text>
            <FlatList
              data={this.state.queueStatus}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: 40}}
              renderItem={({item}) => <SyncCell {...item} />}
            />
          </CardLayout>
        </ScrollView>
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
