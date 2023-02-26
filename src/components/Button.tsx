import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
});

function ButtonComponent(props: any): JSX.Element {
  return (
    <TouchableHighlight onAccessibilityAction={props.Onclick}>
      <Text style={styles.button}>{props.label}</Text>
    </TouchableHighlight>
  );
}

export default (props: any) => {
  return ButtonComponent(props);
};
