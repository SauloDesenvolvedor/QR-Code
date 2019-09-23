import React, {Component} from 'react';
import {View, Alert, Text, StyleSheet, FlatList} from 'react-native';

export default class CodeItem extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.data.data}</Text>
      </View>
    );
  }
}
