import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
const AbstractTextInput = ({
  Height,
  Width,
  Label,
  PlaceHolder,
  placeHolderTextStyle,
  borderRadius,
  borderWidth,
  borderColor,
  borderBottomWidth,
  Value,
  onChangeText = () => false,
  backgroundColor,
  placeholderTextColor,
  type,
  renderLabelIcon,
  renderInputIcon,
  labelStyle,
  password,
  validate,
  alignIcon,
  DefaultValue,
  errorMessage,
}) => {
  const {colors} = useTheme();
  const defaultHeight = Height ? Height : 50;
  const defaultWidth = Width ? Width : '100%';
  const defaultLabel = Label ? Label : 'TextInput';
  const defaultBorderRadius = borderRadius ? borderRadius : 50;
  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : null;
  const defaultBorderColor = borderColor ? borderColor : 0;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  const [errorMsg, setErrorMsg] = useState('*Required Field!');
  const defaultLabelStyle = labelStyle ? labelStyle : styles.labelStyle;

  switch (type) {
    case 'simple':
      return (
        <View style={{marginVertical: 10, width: '100%'}}>
          {Label ? (
            <View style={[styles.tile, {height: 25}]}>
              <Text
                style={[
                  styles.labelStyle,
                  {color: colors.black, fontSize: 16},
                ]}>
                {Label}
              </Text>
            </View>
          ) : null}

          <View
            style={[
              {
                backgroundColor: 'red',
                justifyContent: 'center',
                paddingHorizontal: 15,
                height: defaultHeight,
                width: defaultWidth,
                borderRadius: defaultBorderRadius,
                borderWidth: defaultBorderWidth,
                backgroundColor: defaultBackgroundColor,
                borderColor: defaultBorderColor,
              },
            ]}>
            <TextInput
              placeholder={PlaceHolder}
              style={[
                placeHolderTextStyle,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              placeholderTextColor={placeholderTextColor}
              value={Value}
              onChangeText={e => {
                onChangeText(e);
              }}
              secureTextEntry={password ? true : false}
            />
          </View>
          <Text
            style={{
              color: colors.red1,
              fontSize: 12,
              marginLeft: 12,
            }}>
            {errorMessage}
          </Text>
        </View>
      );
    default:
      return (
        <View
          style={[
            styles.inputBox,
            {
              height: defaultHeight,
              width: defaultWidth,
              // backgroundColor: 'green',
              flexDirection: 'row',
              backgroundColor: defaultBackgroundColor,
            },
          ]}>
          <View
            style={[
              styles.col,
              {
                justifyContent: alignIcon ? alignIcon : 'flex-start',
                // backgroundColor: 'cyan',
                alignItems: 'center',
                // paddingVertical: 4,
                paddingBottom: 9.5,
              },
            ]}>
            {renderLabelIcon
              ? renderLabelIcon()
              : renderInputIcon
              ? renderInputIcon()
              : null}
          </View>

          <View style={[styles.tile, {height: '100%', width: '90%'}]}>
            <View
              style={[
                styles.col,
                {
                  width: '100%',
                  // paddingBottom: 8,
                  borderBottomWidth: defaultBorderBottomWidth,
                  borderColor: defaultBorderColor,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                },
              ]}>
              <Text
                style={[
                  styles.labelStyle,
                  {position: 'absolute', top: 2, zIndex: 1},
                ]}>
                {defaultLabel ? defaultLabel : 'textInput'}
              </Text>
              <TextInput
                // placeholderTextColor={placeholderTextColor}
                // placeholder={PlaceHolder}
                style={[
                  [
                    styles.textInput,
                    {
                      height: '70%',
                      // backgroundColor: 'green',
                      paddingBottom: -1,
                    },
                  ],
                  [styles.placeHolderTextStyle, {}],
                  {color: colors.black},
                ]}
                value={Value}
                onChangeText={onChangeText}
              />
            </View>
          </View>
        </View>
      );
  }
};

export default AbstractTextInput;

const styles = StyleSheet.create({
  inputBox: {
    height: 50,

    width: '100%',
    backgroundColor: 'black',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  tile: {
    height: 20,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  col: {
    height: '100%',
    width: ' 10%',
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
    color: lightThemeColors.grey1,
  },
  placeHolderTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
    // color: 'white',
  },
  textInput: {
    height: 30,
    // width: '100%',
    // justifyContent: 'flex-end',

    // backgroundColor: 'blue',
  },
});
