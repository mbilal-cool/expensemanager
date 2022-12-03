import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import SearchIconSvg from '../../Assets/Icons/searchSvg';
import {useTheme} from '@react-navigation/native';
const SearchBar = ({
  onSubmitEditing,
  inputRef,
  Height,
  Width,
  backgroundColor,
  searchBarPlaceHolder,
  searchBarplaceholderTextColor,
  searchBarPlaceHolderStyle,
  borderRadius,
  borderWidth,
  borderColor,
  Value,
  mimic,
  expenses,
  onChangeText = () => false,
  renderIconRight,
  onFocus = () => false,
}) => {
  const {height, width} = Dimensions.get('window');
  const {colors} = useTheme();
  const defaultHeight = Height ? Height : height * 0.06;
  const defaultWidth = Width ? Width : '100%';
  const defaultBorderRadius = borderRadius ? borderRadius : 100;
  const defaultValue = Value ? Value : null;
  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderColor = borderColor ? borderColor : 0;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.darkBlue1;
  return (
    <View
      style={[
        styles.searchBox,
        {
          height: defaultHeight,
          width: defaultWidth,
          borderRadius: defaultBorderRadius,
          backgroundColor: defaultBackgroundColor,
          borderWidth: defaultBorderWidth,
          borderColor: defaultBorderColor,
        },
      ]}>
      <View style={[styles.col, {paddingLeft: 10}]}>
        <SearchIconSvg />
      </View>
      <View
        style={[
          styles.col,
          {
            // backgroundColor: 'green',
            width: '87%',
            alignItems: 'flex-start',
          },
        ]}>
        {mimic ? (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[styles.labelStyle, {color: colors.grey1, paddingRight: 1}]}>
            {searchBarPlaceHolder}
          </Text>
        ) : (
          <TextInput
            onSubmitEditing={onSubmitEditing}
            ref={inputRef ? inputRef : null}
            onFocus={() => onFocus()}
            placeholderTextColor={searchBarplaceholderTextColor}
            placeholder={searchBarPlaceHolder}
            style={[
              styles.textInput,
              [styles.labelStyle, {color: searchBarplaceholderTextColor}],
              searchBarPlaceHolderStyle,
            ]}
            value={defaultValue}
            onChangeText={e => onChangeText(e)}
          />
        )}
        {renderIconRight ? renderIconRight() : null}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
  },
  col: {
    height: '100%',
    width: ' 13%',
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 15,
    color: lightThemeColors.black,
  },
  textInput: {
    height: '100%',
    width: '100%',

    // backgroundColor: 'blue',
  },
});
