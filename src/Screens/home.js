import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';

import ExpenseDetailItem from '../Components/Module/expenseDetailItem';

import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import HeaderDropDown from '../Components/Module/headerDropDown';
import SearchBar from '../Components/Module/searchBar';
import ExpenseInfoCard from '../Components/Module/expenseInfoCard';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import {expenseList} from '../mockData';
import HomeBottomSheet from '../Components/Module/homeBottomSheet';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fonts, lightThemeColors} from '../theme';
import AbstractModal from '../Components/Abstract/abstractModal';
import AbstractButton from '../Components/Abstract/abstractButton';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
const Home = ({navigation}) => {
  const [password, SetPassword] = useState();
  const [inputpassword, SetinputPassword] = useState();

  const {colors} = useTheme();
  const [date, setDate] = useState({
    month: 'May',
    year: 2022,
    suggestedYear: 2022,
  });
  const [expenses, SetExpenses] = useState(expenseList);
  const [sheetType, setSheetType] = useState('selectDate');
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({name: 'bilal', password: 12345});
  useEffect(() => {
    setObjectValue(user);
    getMyObject().then(res => console.log('hitt', res));
    setIsVisible(true);
  }, []);
  const setObjectValue = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('key', jsonValue);
    } catch (e) {
      // save error
    }

    console.log('Done.');
  };

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }

    console.log('Doneget.');
  };

  const handleEntryDeatilPressed = () => {
    navigation.navigate('EntryDetails');
  };

  const onFocusSearchInput = () => {
    // navigation.navigate('Users');
  };
  const openHomeBottomSheet = () => {
    setSheetType('selectDate');
    SheetManager.show('Home');
  };
  const handleSelectedDate = date => {
    console.log(date);
  };

  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={colors.darkBlue}
      />
      <View
        style={[styles.headerContainer, {backgroundColor: colors.darkBlue}]}>
        <AbstractHeader
          height={height * 0.08}
          backgroundColor={'transparent'}
          renderMiddleItem={() => (
            <View
              style={{
                height: '80%',
                width: '100%',

                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <HeaderDropDown onPress={openHomeBottomSheet} title={date} />
            </View>
          )}
        />
        <TouchableOpacity onPress={onFocusSearchInput}>
          <SearchBar
            mimic={true}
            searchBarplaceholderTextColor={colors.grey1}
            searchBarPlaceHolder={'Search or add expense from catalog...'}
          />
        </TouchableOpacity>
        <ExpenseInfoCard />
      </View>

      <View style={styles.middleContainer}>
        <View
          style={[styles.horizontalContainer, {zIndex: -1, height: 97}]}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ExpenseDetailHeader
            height={50}
            headingMain={'Today'}
            currentDate={'5th ,May'}
            backgroundColor={'transparent'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <ExpenseDetailItem
              onPress={handleEntryDeatilPressed}
              expensesList={expenses}
              borderRadius={6}
              marginBottom={5}
            />
          </View>
          <ExpenseDetailHeader
            height={50}
            headingMain={'Previous'}
            backgroundColor={'transparent'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <ExpenseDetailItem
              onPress={handleEntryDeatilPressed}
              expensesList={expenses}
              borderRadius={6}
              marginBottom={5}
            />
          </View>
        </ScrollView>
      </View>
      <HomeBottomSheet
        id={'Home'}
        type={sheetType}
        setType={setSheetType}
        Date={date}
        setDate={setDate}
      />
      <AbstractModal isVisible={isVisible}>
        <View
          style={[
            styles.horizontalContainer,
            {
              height: 250,
              // backgroundColor: 'green',
              borderRadius: 15,
              justifyContent: 'space-around',
            },
          ]}>
          <View style={[styles.horizontalContainer, {}]}>
            <Text>Enter password To LogIn</Text>
          </View>

          <AbstractTextInput
            Label={inputpassword == user.password ? null : 'Enter "1****5"'}
            Value={inputpassword}
            onChangeText={SetinputPassword}
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={styles.labelStyle}
            type={'simple'}
            PlaceHolder={'Type Here..'}
            placeholderTextColor={lightThemeColors.grey}
          />
          <AbstractButton
            borderWidth={1}
            borderColor={colors.black}
            backgroundColor={'transparent'}
            height={45}
            title={'LogIn'}
            titleStyle={{
              color: colors.black,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={() =>
              inputpassword == user.password ? setIsVisible(false) : null
            }
          />
        </View>
      </AbstractModal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  headerContainer: {
    height: height * 0.27,

    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 0.8661,
    width: '100%',
    // backgroundColor: 'red',
  },
  horizontalContainer: {
    height: 57,

    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
