// imports libraries/API's
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Modal, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import BarcodeMask from 'react-native-barcode-mask';

// imports components
import CodeItem from './src/components/CodeItem';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCode: [],
      isModal: false,
    };
  }

  componentDidMount() {
    //pegar o arquivo do asyncsotrage e jogar para o listcode
    AsyncStorage.getItem('listCode').then(value => {
      if (value != '') {
        this.setState({listCode: JSON.parse(value)});
      }
    });
  }

  async letBarCode(obj) {
    if (obj.type != null) {
      this.state.isModal = false;
      this.state.listCode.push({
        key: this.state.listCode.length,
        type: obj.type,
        data: obj.data,
      });

      this.setState(this.state);
      //os dados do qrcode e jogar para o asyncstorage
      try {
        await AsyncStorage.setItem(
          'listCode',
          JSON.stringify(this.state.listCode),
        );
      } catch (e) {
        alert(e);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*----------- Flatlist código de barras -----------*/}
        <FlatList
          data={this.state.listCode}
          renderItem={({item}) => <CodeItem data={item} />}
          style={styles.container}
        />
        <Button
          title="Abrir câmera"
          onPress={() => this.setState({isModal: true})}
        />
        {/*----------- Modal para carregar a lista de código de barras -----------*/}
        <Modal visible={this.state.isModal} animationType="slide">
          <View style={styles.container}>
            <RNCamera
              onBarCodeRead={obj => this.letBarCode(obj)}
              style={styles.container}
              ref={camera => (this.camera = camera)}
              type={RNCamera.Constants.Type.back}
              permissionDialogTitle="Permissão para usar a camera"
              permissionDialogMessage="Precisamos usar a sua camera">
              <BarcodeMask
                edgeColor={'#62B1F6'}
                showAnimatedLine={true}
                transparency={0.8}
              />
            </RNCamera>
            <Button
              title="Voltar"
              onPress={() => this.setState({isModal: false})}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
