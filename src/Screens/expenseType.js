import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../theme';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import SearchBar from '../Components/Module/searchBar';
import {expenseTypes} from '../mockData';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import {SheetManager} from 'react-native-actions-sheet';
import ExpenseTypeItem from '../Components/Module/expenseTypeItem';
import AbstractNoData from '../Components/Abstract/abstractNoData';
import ThemeController from '../Controller/themeController';
import HomeBottomSheet from '../Components/Module/homeBottomSheet';
import ExpenseController from '../Controller/expenseController';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContainerElement from '../Components/Abstract/containerElement';
const ExpenseCategoryListPlacehlder = ({showAllButton}) => {
  const {colors} = useTheme();
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="flex-end"
        marginBottom={12}>
        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />

        <SkeletonPlaceholder.Item
          width={'79%'}
          height={50}
          borderRadius={4}
          marginLeft={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
const ExpenseType = ({route, navigation}) => {
  const inputRef = useRef();
  const [input, setInput] = useState('');
  const [searchedData, SetSearchData] = useState();
  const expensesCategories = useSelector(
    state => state.expense.expenseCategories,
  );
  const {type, screenName, editExpense} = route.params ? route.params : '';
  // console.log('type in expence type:', type, screenName);
  const [types, setTypes] = useState([]);
  const [darkMode, setDarkMode] = useState(expenseTypes);
  const [sheetType, setSheetType] = useState('addExpenseType');
  let placeHolderArray = [0, 0, 0, 0];
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();
  const onAddTypePressed = type => {
    ExpenseController.addExpenseCategories(type, call_back => {
      // console.log('add categories response', call_back);
    });
  };
  const openHomeBottomSheet = () => {
    setSheetType('addExpenseType');
    SheetManager.show('etype');
  };
  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    ExpenseController.handlegetExpenseCategories(res => {
      setLoading(res);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const handleExpenseTypePressed = item => {
    navigation.navigate(screenName, {
      expensCategoryItem: item,
      type,
      editExpense,
    });
  };
  onSubmitText = () => {
    inputRef.current.blur();
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const searchFilterFunction = txt => {
    setInput(txt);
    if (txt) {
      const newData = expensesCategories.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      SetSearchData(newData);
    }
  };
  console.log('searched Items', searchedData);
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={colors.defaultBackground}
      />
      <AbstractHeader
        backgroundColor={'transparent'}
        renderMiddleItem={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              //   backgroundColor: 'green',
              justifyContent: 'flex-end',
              paddingBottom: 15,
              alignItems: 'center',
            }}>
            <Text style={[styles.titleStyle, {color: colors.black}]}>
              Expense Type
            </Text>
          </View>
        )}
        renderLeftItem={() => (
          <TouchableOpacity
            onPress={() => handleLeftArrowPressed()}
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'green',
              justifyContent: 'flex-end',
              //   alignItems: 'center',
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}>
            <ArrowLeftTailSvg color={colors.black} />
          </TouchableOpacity>
        )}
      />
      <ContainerElement>
        <SearchBar
          searchBarPlaceHolder={'Search expanse type'}
          searchBarplaceholderTextColor={colors.grey1}
          backgroundColor={colors.white}
          borderWidth={1}
          borderColor={colors.grey2}
          onSubmitEditing={onSubmitText}
          inputRef={inputRef}
          // onFocus={onFocus}
          Value={input}
          onChangeText={e => {
            searchFilterFunction(e);
          }}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.sugesstionHeading}>
            Already added Expense Type
          </Text>
        </View>
      </ContainerElement>
      <>
        <View style={styles.middleContainer}>
          <View>
            {input ? (
              <>
                {loading ? (
                  <>
                    {noOfPlaceHolders.map((item, index) => (
                      <ExpenseCategoryListPlacehlder key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {searchedData != 0 ? (
                      <FlatList
                        contentContainerStyle={{paddingBottom: 20}}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={searchedData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <ExpenseTypeItem
                              key={index}
                              item={item}
                              onPress={item => handleExpenseTypePressed(item)}
                            />
                          );
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: '100%',
                          // backgroundColor: 'tomato',
                          justifyContent: 'center',
                        }}>
                        <AbstractNoData
                          caption={"Sorry we couldn't find any results! "}
                        />
                      </View>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <>
                    {placeHolderArray.map((item, index) => (
                      <ExpenseCategoryListPlacehlder key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {expensesCategories.length != 0 ? (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={expensesCategories}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <ExpenseTypeItem
                              key={index}
                              item={item}
                              onPress={item => handleExpenseTypePressed(item)}
                            />
                          );
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: '100%',
                          // backgroundColor: 'tomato',
                          justifyContent: 'center',
                        }}>
                        <AbstractNoData
                          caption={"Sorry we couldn't find any Expense Types "}
                        />
                      </View>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </>
      <ContainerElement>
        <AbstractButton
          backgroundColor={lightThemeColors.red1}
          height={50}
          title={'Add New'}
          titleStyle={{
            color: colors.white,
            fontFamily: Fonts.interBold,
            fontWeight: '600',
            fontSize: 16,
          }}
          iconMargin={10}
          width={'100%'}
          borderRadius={30}
          onPress={openHomeBottomSheet}
        />
      </ContainerElement>
      <HomeBottomSheet
        id={'etype'}
        type={sheetType}
        setType={setSheetType}
        buttontitle={'Add'}
        onPress={type => onAddTypePressed(type)}
      />
    </View>
  );
};

export default ExpenseType;

const styles = StyleSheet.create({
  main: {
    flex: 1,

    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  middleContainer: {
    flex: 0.95,
    width: '100%',
    // backgroundColor: 'green',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    // paddingBottom: 30,
  },
  horizontalContainer: {
    height: 50,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey1,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 20,
    color: lightThemeColors.black,
  },
});
