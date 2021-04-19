import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Helpers from '../core/helpers';

class ModalLayout extends React.Component {
  render() {
    this.modalVisible = this.props.modalVisible;
    this.historyData = this.props.historyData;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.cellStyle}>
              <Text style={styles.modalTitle}>Historial</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={this.props.onPressDismissButton}>
                <Image
                  style={styles.closeImage}
                  source={require('../assets/icons/ic_close.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cellStyle}>
              <Text style={styles.headerStyle}>Fecha</Text>
              <Text style={styles.headerStyle}>Valor</Text>
            </View>

            <FlatList
              data={this.historyData}
              renderItem={({item}) => (
                <View style={styles.cellStyle}>
                  <Text>{Helpers.getDDMMYYYY(item.label)}</Text>
                  <Text>{item.y}</Text>
                </View>
              )}
              keyExtractor={item => item.y}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: -15,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cellStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  closeImage: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ModalLayout;
