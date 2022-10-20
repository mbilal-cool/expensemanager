import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
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
  const defaultLabelStyle = labelStyle ? labelStyle : styles.labelStyle;
  const validateErrorMessage = () => {
    if (Value == '') {
      return validate ? '*Required Field' : null;
    } else if (Value != '') {
      return validate ? errorMessage : null;
    }
  };
  switch (type) {
    case 'simple':
      return (
        <View>
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
              styles.inputBox,
              {
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
            <View style={[styles.tile, {height: 25}]}>
              <View
                style={[
                  styles.col,
                  {
                    // backgroundColor: 'red',
                    width: '100%',
                    // paddingBottom: 8,
                    borderBottomWidth: defaultBorderBottomWidth,
                    borderColor: defaultBorderColor,
                  },
                ]}>
                <TextInput
                  placeholder={PlaceHolder}
                  style={[
                    [styles.textInput, {height: 50}],
                    placeHolderTextStyle,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}
                  placeholderTextColor={placeholderTextColor}
                  value={Value}
                  onChangeText={e => {
                    onChangeText(e);
                  }}
                  secureTextEntry={password ? true : false}
                />
                <Text
                  style={{
                    color: colors.red1,
                    fontSize: 12,
                    position: 'absolute',
                    bottom: -30,
                    left: 0,
                  }}>
                  {validateErrorMessage()}
                </Text>
              </View>
            </View>
          </View>
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
              backgroundColor: defaultBackgroundColor,
            },
          ]}>
          <View style={styles.tile}>
            <View
              style={[
                styles.col,
                {
                  justifyContent: 'flex-start',
                  // backgroundColor: 'cyan',
                  alignItems: 'center',
                },
              ]}>
              {renderLabelIcon ? renderLabelIcon() : null}
            </View>
            <View
              style={[
                styles.col,
                {
                  width: '90%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                },
              ]}>
              <Text style={defaultLabelStyle}>{defaultLabel}</Text>
            </View>
          </View>

          <View style={[styles.tile, {height: 25}]}>
            <View
              style={[
                styles.col,
                {
                  // paddingBottom: 8,
                  // backgroundColor: 'cyan',
                  justifyContent: 'center',
                },
              ]}>
              {renderInputIcon ? renderInputIcon() : null}
            </View>
            <View
              style={[
                styles.col,
                {
                  // backgroundColor: 'red',
                  width: '85%',
                  // paddingBottom: 8,
                  borderBottomWidth: defaultBorderBottomWidth,
                  borderColor: defaultBorderColor,
                },
              ]}>
              <TextInput
                placeholderTextColor={placeholderTextColor}
                placeholder={PlaceHolder}
                style={[
                  styles.textInput,
                  styles.placeHolderTextStyle,
                  {color: colors.black},
                ]}
                value={Value}
                onChangeText={onChangeText}
              />

              {/* <Text style={{color: 'black'}}>gfdhsvsdfgsh</Text> */}
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
    fontSize: 9,
    // color: 'white',
  },
  textInput: {
    height: 30,
    width: '100%',
    // justifyContent: 'flex-end',

    // backgroundColor: 'blue',
  },
});
