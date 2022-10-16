import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
const ContainerElement = ({children}) => {
  const {colors} = useTheme();
  return <View style={[styles.main]}>{children}</View>;
};

export default ContainerElement;

const styles = StyleSheet.create({
  main: {
    height: null,
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
});
