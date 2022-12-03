import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AbstractBottomSheet from '../Abstract/abstractBottomSheet';
import {SheetManager} from 'react-native-actions-sheet';
import {Fonts, lightThemeColors} from '../../theme';
import AbstractButton from '../Abstract/abstractButton';
import AbstaractRadioButton from '../Abstract/abstractRadioButton';
import {useTheme} from '@react-navigation/native';
import ArrowDownIconSvg from '../../Assets/Icons/arrowDownSvg';
import ArrowUpIconSvg from '../../Assets/Icons/arrowUpSvg';
import AbstractTextInput from '../Abstract/abstractTextInput';
import {ScrollView} from 'react-native-gesture-handler';
import ReduxDispatchController from '../../Controller/reduxDispatchController';
import ExpenseController, {
  useDateQuery,
} from '../../Controller/expenseController';
const {height, width} = Dimensions.get('window');
const HomeBottomSheet = ({
  id,
  type,
  setType,
  Date,
  setDate,
  buttontitle,
  onPress = () => false,
}) => {
  let allTime = {id: 1, title: 'All Time', pressed: false};
  const selectedDateQuery = useDateQuery();
  const [Tougle, SetTougle] = useState(false);
  const [inputExpenseType, setInputExpenseType] = useState('');

  const {colors} = useTheme();
  const [buttonTitle, setButtonTitle] = useState(buttontitle);
  const [inputYear, SetInputYear] = useState('2022');
  const [options, SetOptions] = useState([
    {id: 0, title: 'Whole Year', pressed: false},
    {id: 1, title: 'January', pressed: false},
    {id: 2, title: 'Feburary', pressed: false},
    {id: 3, title: 'March', pressed: false},
    {id: 4, title: 'April', pressed: false},
    {id: 5, title: 'May', pressed: false},
    {id: 6, title: 'June', pressed: false},
    {id: 7, title: 'July', pressed: false},
    {id: 8, title: 'August', pressed: false},
    {id: 9, title: 'September', pressed: false},
    {id: 10, title: 'Octobor', pressed: false},
    {id: 11, title: 'November', pressed: false},
    {id: 12, title: 'December', pressed: false},
  ]);
  const [yearList, SetYearList] = useState([
    {id: 1, title: 2022, pressed: false},
    {id: 1, title: 2021, pressed: false},
    {id: 1, title: 2020, pressed: false},
    {id: 1, title: 2019, pressed: false},
    {id: 1, title: 2018, pressed: false},
    {id: 1, title: 2017, pressed: false},
    {id: 1, title: 2016, pressed: false},
    {id: 1, title: 2015, pressed: false},
    {id: 1, title: 'All Time', pressed: false},
  ]);
  const [addNewYear, SetAddNewYear] = useState([
    {id: 1, title: 2023, pressed: false},
    {id: 1, title: 2024, pressed: false},
    {id: 1, title: 2025, pressed: false},
    {id: 1, title: 2026, pressed: false},
    {id: 1, title: 2027, pressed: false},
    {id: 1, title: 2028, pressed: false},
    {id: 1, title: 2029, pressed: false},
    {id: 1, title: 2030, pressed: false},
  ]);

  const [isVisible, setDropDownVisible] = useState(false);
  useEffect(() => {
    setButtonTitle(buttonTitle);
  }, []);

  useEffect(() => {
    let mArray = options.map(item => {
      if (item.title == selectedDateQuery.month) {
        return {...item, pressed: true};
      }
      if (item.id == selectedDateQuery.month) {
        return {...item, pressed: true};
      } else {
        return {...item, pressed: false};
      }
    });
    SetOptions(mArray);
  }, [selectedDateQuery.month]);

  const onClose = () => {
    setType(type);
    setDropDownVisible(false);
    setButtonTitle('Add New');
  };
  const onAddNewPress = () => {
    setType('addNewYear');
  };
  const onAddsuggestedYear = () => {
    SetYearList(
      prev => (
        (prev = prev.filter(item => item.title != 'All Time')),
        [...prev, {id: 1, title: Date.suggestedYear, pressed: false}, allTime]
      ),
    );

    setDropDownVisible(false);
  };
  const onInputAddYear = () => {
    SetAddNewYear(prev => [...prev, {id: 1, title: inputYear, pressed: false}]);
  };

  const handleYearPressed = year => {
    ReduxDispatchController.Expense.updatedDateQueryInStore('year', year);
    ReduxDispatchController.Expense.updatedDateQueryInStore('toggle', true);
    ExpenseController.handleFindExpenseByMonthWithYear(
      {month: selectedDateQuery.month, year},
      callback => console.log('ddres??', callback),
    );
    setDropDownVisible(false);
    SheetManager.hide(id);
  };
  const handleMonthPressed = month => {
    ReduxDispatchController.Expense.updatedDateQueryInStore('month', month);
    ReduxDispatchController.Expense.updatedDateQueryInStore('toggle', true);
    ExpenseController.handleFindExpenseByMonthWithYear(
      {month, year: selectedDateQuery.year},
      callback => console.log('ddres??', callback),
    );
    SheetManager.hide(id);
  };
  const handleSuggestedYearPressed = suggestedYear => {
    setDate(prev => ({...prev, suggestedYear: suggestedYear}));
    setDropDownVisible(false);
  };
  const selectBottomSheetType = type => {
    switch (type) {
      case 'selectDate': {
        return (
          <View style={[styles.main, {height: height * 0.7, paddingTop: 20}]}>
            <View
              style={[
                styles.containerHorizontal,
                {
                  flex: 0.1,
                  // backgroundColor: 'tomato',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingHorizontal: 20,
                },
              ]}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.titleStyle,
                    {
                      color: colors.black,
                      marginRight: 10,
                      alignSelf: 'center',
                    },
                  ]}>
                  year:
                </Text>
                <TouchableOpacity
                  onPress={() => setDropDownVisible(!isVisible)}
                  style={[
                    styles.dropDownContainerStyle,
                    {backgroundColor: colors.skyBlueLight},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.titleStyle, {color: colors.black}]}>
                      {selectedDateQuery.year}
                    </Text>
                    <ArrowDownIconSvg
                      height={12}
                      width={12}
                      color={colors.black}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.containerHorizontal,
                {
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  // paddingBottom: 10,
                },
              ]}>
              <View style={styles.radioContainerColumn}>
                <AbstaractRadioButton
                  onPress={month => handleMonthPressed(month)}
                  options={options}
                  setOPtions={SetOptions}
                  width={110}
                  titleStyle={[
                    styles.titleStyle,
                    {fontSize: 14, marginLeft: 13},
                  ]}
                />
              </View>
              {isVisible ? (
                <View
                  style={[
                    {
                      // backgroundColor: 'green',
                      backgroundColor: colors.skyBlueLight,
                      height: height * 0.5,
                    },
                    styles.dropDown,
                    styles.shadow,
                  ]}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <AbstaractRadioButton
                      onPress={year => handleYearPressed(year)}
                      justifyContent={'space-between'}
                      reverse={true}
                      options={yearList}
                      setOPtions={SetYearList}
                      width={'100%'}
                      // height={100}
                      titleStyle={[
                        styles.titleStyle,
                        {fontSize: 14, marginLeft: 13},
                      ]}
                    />
                  </ScrollView>
                </View>
              ) : null}
            </View>
          </View>
        );
      }
      case 'suggestNewYear':
        return (
          <View
            style={[
              styles.main,
              {
                height: height * 0.3,
                paddingVertical: 0,
                // backgroundColor: 'red',

                justifyContent: 'flex-end',
              },
            ]}>
            <View
              style={[
                styles.containerHorizontal,
                {
                  height: null,
                  // backgroundColor: 'green',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingHorizontal: 20,
                },
              ]}>
              <TouchableOpacity
                onPress={() => setDropDownVisible(!isVisible)}
                style={[
                  styles.dropDownContainerStyle,
                  {
                    backgroundColor: colors.skyBlueLight,
                    width: '100%',
                    height: 50,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%',
                    // backgroundColor: 'green',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.titleStyle, {color: colors.black}]}>
                    {Date.suggestedYear}
                  </Text>
                  <ArrowUpIconSvg height={12} width={12} color={colors.black} />
                </View>
              </TouchableOpacity>
              {isVisible ? (
                <View
                  style={[
                    styles.dropUp,
                    {backgroundColor: colors.skyBlueLight},
                    styles.shadow,
                  ]}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <AbstaractRadioButton
                      onPress={year => handleSuggestedYearPressed(year)}
                      justifyContent={'space-between'}
                      reverse={true}
                      options={addNewYear}
                      setOPtions={SetAddNewYear}
                      width={'100%'}
                      titleStyle={[
                        styles.titleStyle,
                        {fontSize: 14, marginLeft: 13},
                      ]}
                    />
                    <AbstractButton
                      onPress={onAddNewPress}
                      title={'Add New'}
                      titleStyle={[
                        styles.titleStyle,
                        {color: colors.red1, marginRight: 25, fontSize: 14},
                      ]}
                      backgroundColor={'transparent'}
                      height={20}
                      width={'30%'}
                    />
                  </ScrollView>
                </View>
              ) : null}
            </View>
          </View>
        );
      case 'addNewYear':
        return (
          <View
            style={[
              styles.main,
              {
                height: height * 0.15,

                paddingTop: 20,
                backgroundColor: 'transparent',
                // justifyContent: 'flex-end',
              },
            ]}>
            <View
              style={[
                styles.containerHorizontal,
                {
                  flex: 0.65,
                  // backgroundColor: 'tomato',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  // paddingHorizontal: 20,
                },
              ]}>
              <AbstractTextInput
                Value={inputYear}
                onChangeText={SetInputYear}
                Label={'Year'}
                Height={50}
                borderWidth={1}
                borderColor={lightThemeColors.grey}
                placeHolderTextStyle={[
                  styles.titleStyle,
                  {color: colors.black},
                ]}
                placeholderTextColor={colors.black}
                type={'simple'}
                PlaceHolder={'2022'}
              />
            </View>
          </View>
        );
      case 'addExpenseType':
        return (
          <View
            style={[
              styles.main,
              {height: height * 0.15, justifyContent: 'center', paddingTop: 20},
            ]}>
            <View
              style={[
                styles.containerHorizontal,
                {
                  // backgroundColor: 'yellow',
                  // justifyContent: 'space-between',
                  paddingHorizontal: 20,
                },
              ]}>
              <AbstractTextInput
                borderWidth={1}
                borderColor={lightThemeColors.grey}
                Label={'ExpenseType'}
                placeHolderTextStyle={[
                  styles.labelStyle,
                  {color: colors.black},
                ]}
                type={'simple'}
                PlaceHolder={'Type'}
                placeholderTextColor={lightThemeColors.grey}
                Value={inputExpenseType}
                onChangeText={setInputExpenseType}
              />
            </View>
          </View>
        );

      default:
        return;
    }
  };

  const onPressHandler = type => {
    if (type == 'selectDate') {
      setButtonTitle('Add');
      setType('suggestNewYear');
    } else if (type == 'suggestNewYear') {
      SheetManager.hide(id);
      onAddsuggestedYear();
      setButtonTitle('Add');
    } else if (type == 'addNewYear') {
      onInputAddYear();
      setType('suggestNewYear');
    } else if (type == 'addExpenseType') {
      onPress(inputExpenseType);
      SheetManager.hide(id);
    }
  };
  return (
    <View>
      <AbstractBottomSheet
        type={type}
        id={id}
        onButtonPress={() => onPressHandler(type)}
        buttonTitle={buttonTitle}
        appendButton={true}
        onClose={onClose}>
        {selectBottomSheetType(type)}
      </AbstractBottomSheet>
    </View>
  );
};

export default HomeBottomSheet;

const styles = StyleSheet.create({
  main: {
    width: '100%',

    // backgroundColor: 'red',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    alignItems: 'flex-end',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
  },
  radioContainerColumn: {
    height: '97%',
    // backgroundColor: 'yellow',
    width: 200,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  dropDownContainerStyle: {
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  dropDown: {
    width: width * 0.37,
    top: 10,
    right: 10,
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 10,
    zIndex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropUp: {
    height: 275,
    width: '100%',

    borderRadius: 13,
    position: 'absolute',
    top: -280,
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
