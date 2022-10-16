import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '@react-navigation/native';
import ArrowRightIconSvg from '../../Assets/Icons/arrowRightsvg';
const AbstractDropDown = ({
  renderIconRight,
  Title,
  onPress,
  titleStyle,
  type,
  Data,
  value,
  onChange,
  Height,
  borderBottomWidth,
  borderRadius,
  brColor,
  borderWidth,
  backgroundColor,
  Label,
  labelStyl,
  placeholderStyle,
  labelContainerPadding,
}) => {
  const {colors} = useTheme();
  switch (type) {
    case 'pressable':
      return (
        <View style={{justifyContent: 'flex-end'}}>
          {Label ? (
            <View
              style={{
                height: 20,
                backgroundColor: 'tomato',
                width: '100%',
                paddingHorizontal: labelContainerPadding
                  ? labelContainerPadding
                  : 0,
                justifyContent: 'flex-end',
                borderRadius: borderRadius,
              }}>
              <Text style={labelStyl}>{Label}</Text>
            </View>
          ) : null}
          <TouchableOpacity
            onPress={onPress}
            style={[styles.style, {height: Height ? Height : 90}]}>
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderBottomWidth: borderBottomWidth ? borderBottomWidth : 0,
                  borderColor: brColor ? brColor : lightThemeColors.grey1,
                },
              ]}
              placeholderStyle={[styles.titlestyle, placeholderStyle]}
              selectedTextStyle={[styles.titlestyle, placeholderStyle]}
              data={Data}
              maxHeight={120}
              labelField="label"
              valueField="value"
              placeholder={Title}
              value={value}
              onChange={item => {
                onChange(item);
              }}
              renderRightIcon={() =>
                renderIconRight ? (
                  renderIconRight()
                ) : (
                  <ArrowRightIconSvg
                    color={lightThemeColors.grey1}
                    height={10}
                    width={5}
                  />
                )
              }
            />
          </TouchableOpacity>
        </View>
      );

    default:
      return (
        <TouchableOpacity
          onPress={onPress ? onPress : () => console.log('dropDown')}
          style={[
            styles.main,
            {
              height: Height ? Height : 65,
              borderWidth: borderWidth ? borderWidth : 0,
              borderColor: brColor ? brColor : 'transparent',
              backgroundColor: backgroundColor ? backgroundColor : colors.white,
            },
          ]}>
          <View style={[styles.col, {}]}>
            <Text style={[styles.textstyl, {color: colors.black}]}>
              {Title ? Title : 'hello'}
            </Text>
          </View>
          <View style={[styles.col, {width: '25%', alignItems: 'center'}]}>
            {renderIconRight ? renderIconRight() : null}
          </View>
        </TouchableOpacity>
      );
  }
};

export default AbstractDropDown;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: 65,
    width: '100%',

    borderRadius: 5,
    borderWidth: 0.5,
  },
  col: {
    height: '100%',
    width: '75%',
    // backgroundColor: 'red',

    justifyContent: 'center',
  },
  imgStyl: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTile: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'flex-end',
    // flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textstyl: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
    // color: Colors.blue13,
  },
  dropdown: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'blue',

    // paddingHorizontal: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  logostyl: {
    height: 22,
    width: 22,
  },
  style: {
    // backgroundColor: 'red',

    width: '100%',
    fontFamily: Fonts.regular,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 10,
  },
  titlestyle: {
    color: lightThemeColors.black,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Fonts.interBold,
  },
  title: 'select Country',

  data: [
    {label: 'Afghanistan', value: '1'},
    {label: 'Albania ', value: '2'},
    {label: 'Algeria ', value: '3'},
    {label: 'AndorrA ', value: '4'},
    {label: 'Argentina ', value: '5'},
    {label: 'Australia ', value: '6'},
    {label: 'Pakistan ', value: '7'},
    {label: 'India ', value: '8'},
  ],
  value: '2',
  onChange: () => console.log('helloreact native'),
});
