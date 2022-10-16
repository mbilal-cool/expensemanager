import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SearchSugesstionItem from '../Components/Module/searchSuggestionitem';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../theme';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';

import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';

import SearchBar from '../Components/Module/searchBar';

import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import {expenseList} from '../mockData';
import AbstractButton from '../Components/Abstract/abstractButton';
import PlusIconSvg from '../Assets/Icons/plusSvg';
import SearchResultItem from '../Components/Module/searchResultItem';
import ArrowDownIconSvg from '../Assets/Icons/arrowDownSvg';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ArrowUpIconSvg from '../Assets/Icons/BottomTabSvgs/arrowUpSvg';
import ThemeController from '../Controller/themeController';
const {height, width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const {colors} = useTheme();
  const [expenses, SetExpenses] = useState(expenseList);
  const [searchDropDown, setSearchDropDown] = useState(false);
  const [darkMode, setDarkMode] = useState();

  const [input, setInput] = useState('');
  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const addOneTimePresss = () => {
    navigation.navigate('OneTimeExpense');
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={colors.darkBlue}
      />
      <View
        style={[styles.headerContainer, {backgroundColor: colors.darkBlue}]}>
        <AbstractHeader
          height={height * 0.08}
          backgroundColor={'transparent'}
          renderLeftItem={() => (
            <TouchableOpacity
              onPress={() => handleLeftArrowPressed()}
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'green',
                justifyContent: 'flex-end',
                paddingBottom: 13,
              }}>
              <ArrowLeftTailSvg color={lightThemeColors.white} />
            </TouchableOpacity>
          )}
        />
        <SearchBar
          renderIconRight={() => (
            <TouchableOpacity
              onPress={() => setSearchDropDown(!searchDropDown)}
              style={{
                position: 'absolute',
                right: 0,
                height: height * 0.06,
                width: 50,
                borderTopRightRadius: 35,
                borderBottomRightRadius: 35,

                backgroundColor: lightThemeColors.red1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {searchDropDown ? (
                <ArrowUpIconSvg color={colors.white} />
              ) : (
                <ArrowDownIconSvg width={12} height={6} color={colors.white} />
              )}
            </TouchableOpacity>
          )}
          Value={input}
          onChangeText={setInput}

          //   onFocus={setFocusSearch}
        />
        {searchDropDown ? <SearchSugesstionItem /> : null}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            height: '32%',
            alignItems: 'flex-end',
            zIndex: -1,
            // backgroundColor: 'green',
          }}>
          <AbstractButton
            backgroundColor={lightThemeColors.red1}
            height={height * 0.05}
            title={'Onetime Expanse'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 12,
              zIndex: -1,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={addOneTimePresss}
            renderRightIcon={() => (
              <PlusIconSvg
                width={height * 0.015}
                height={height * 0.015}
                color={colors.white}
              />
            )}
          />
          <AbstractButton
            borderWidth={1}
            borderColor={lightThemeColors.white}
            backgroundColor={'transparent'}
            height={height * 0.05}
            title={'Recurring Expanse'}
            titleStyle={{
              color: lightThemeColors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 12,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={addOneTimePresss}
            renderRightIcon={() => (
              <PlusIconSvg
                width={height * 0.015}
                height={height * 0.015}
                color={colors.white}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={[styles.horizontalContainer]}>
          <Text style={styles.sugesstionHeading}>
            Search results from catalog
          </Text>
        </View>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <SearchResultItem />
            <SearchResultItem />
            <SearchResultItem />
          </View>
          <View style={[styles.horizontalContainer]}>
            <Text style={styles.sugesstionHeading}>Already added Expense</Text>
          </View>
          <ExpenseDetailHeader backgroundColor={'transparent'} />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <ExpenseDetailItem
              expensesList={expenses}
              borderRadius={6}
              marginBottom={5}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  headerContainer: {
    height: height * 0.23,
    // backgroundColor: lightThemeColors.darkBlue,
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    height: 576,
    width: '100%',
    // backgroundColor: 'green',
    zIndex: -1,
  },
  horizontalContainer: {
    height: 57,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey,
  },
});
