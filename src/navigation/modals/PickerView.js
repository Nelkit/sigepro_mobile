import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import Colors from '../../core/colors';
import Helpers from '../../core/helpers';
import ModalLayout from '../../components/ModalLayout';
import TextFont from '../../components/TextFont';
import TextField from '../../components/TextField';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Divider from '../../components/Divider';

const PickerItem = ({ title, subtitle }) => {
  return (
    <View style={styles.pickerItem}>
      <Row>
        <Col weight={12}>
          <TextFont fontSize={18}>{title}</TextFont>
          {subtitle && (
            <TextFont color={Colors.secondaryText} fontSize={12}>{subtitle}</TextFont>
          )}
        </Col>
        <Col weight={1}>
          <Image style={styles.chevronIcon} source={require('../../assets/images/icons/ic_right_arrow.png')}  />
        </Col>
      </Row>
      <View style={styles.divider}/>
    </View>
  )
};

class PickerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    const { params } = this.props.route
    const { title, list, didSelected } = params;
    console.log(params)

    return (
      <ModalLayout title={title} handleCloseModal={()=>this.props.navigation.goBack()}>
        <TextField 
          placeholder={'Buscar en la lista'}
          value={''}
        />
        <View style={styles.flatList}>
          {list.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
              onPress={() => {
                if (didSelected){
                  didSelected(index)
                }
                this.props.navigation.goBack()
              }}>
                <PickerItem title={item.label} subtitle={item.subtitle}/>
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalLayout>
    );
  }
}

const styles = StyleSheet.create({
  flatList:{
    backgroundColor: '#F2F2F2',
    marginTop: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingTop: 10,
    borderRadius: 10
  },
  divider:{
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 15,
  },
  pickerItem: {
    paddingHorizontal: 10,
  },
  chevronIcon:{
    width: 25,
    height: 18,
    resizeMode: 'contain'
  },
});

export default PickerView;
