import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import ContainerElement from '../Components/Abstract/containerElement';
import {lightThemeColors, Fonts} from '../theme';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import SearchBar from '../Components/Module/searchBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ArrowRightIconSvg from '../Assets/Icons/arrowRightsvg';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import PlusIconSvg from '../Assets/Icons/plusSvg';
import ThemeController from '../Controller/themeController';
import {useSelector} from 'react-redux';
import ExpenseController from '../Controller/expenseController';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import {FlatList} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ExpenseDetailItemListPlacehlder = ({showAllButton}) => {
  const {colors} = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={colors.white}
      highlightColor={'#F4f4f9'}
      speed={1200}>
      <SkeletonPlaceholder.Item alignItems="center">
        <SkeletonPlaceholder.Item width={'100%'} height={27} marginBottom={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
const Catalog = ({route, navigation}) => {
  const {previousRoute} = route.params;
  const catalogueExpenses = useSelector(
    state => state.expense.catalogueExpenses,
  );
  // console.log('allcatalog:', catalogueExpenses, catalogueExpenses.length);
  const [loading, setLoading] = useState(true);
  const [noOfPlaceHolders, setNoOfPlaceHolders] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  // console.log('catalogueExpenses', previousRoute);
  const {colors} = useTheme();
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
      ExpenseController.getAllExpenseCatalogue(res => {
        setLoading(false);
        console.log('res in catalogue Screen');
      });
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const onPressSingleExpenseItem = item => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
      previousRoute,
    });
  };
  const handleEntryDeatilPressed = () => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
    });
  };
  const onCreatePress = () => {
    navigation.navigate('AddCatalog', {type: 'add'});
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const onExpensesPress = () => {
    navigation.navigate('Expenses');
  };
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.defaultBackground}
        translucent={true}
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
              Catalog
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
        renderRightItem={() => (
          <View
            style={{
              height: '100%',
              justifyContent: 'flex-end',
              paddingBottom: 16,
              marginRight: 20,
            }}>
            <AbstractButton
              backgroundColor={'transparent'}
              height={20}
              title={'Expense'}
              titleStyle={{
                color: lightThemeColors.red1,
                fontFamily: Fonts.interBold,
                fontWeight: '500',
                fontSize: 12,
              }}
              onPress={onExpensesPress}
              renderRightIcon={() => <ArrowRightIconSvg />}
              iconMargin={8}
              width={'100%'}
              // onPress={onExpensesPress}
            />
          </View>
        )}
      />

      <View style={styles.middleContainer}>
        <View>
          <ContainerElement>
            <SearchBar
              searchBarPlaceHolderStyle={[styles.titleStyle, {fontSize: 16}]}
              searchBarPlaceHolder={'Search '}
              searchBarplaceholderTextColor={colors.grey}
              backgroundColor={colors.white}
              borderWidth={1}
              borderColor={colors.grey2}
            />
          </ContainerElement>
          <View style={{paddingVertical: 10}}>
            <ExpenseDetailHeader height={24} backgroundColor={'transparent'} />
          </View>
          <ContainerElement>
            {loading ? (
              <>
                {noOfPlaceHolders.map((item, index) => (
                  <ExpenseDetailItemListPlacehlder key={index} />
                ))}
              </>
            ) : (
              <>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  data={catalogueExpenses}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <ExpenseDetailItem
                        key={index}
                        item={item}
                        onPress={item => onPressSingleExpenseItem(item)}
                      />
                    );
                  }}
                />
              </>
            )}
          </ContainerElement>
        </View>
        <ContainerElement>
          <AbstractButton
            backgroundColor={colors.red1}
            height={50}
            title={'Create'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            renderRightIcon={() => (
              <PlusIconSvg height={12} width={12} color={colors.white} />
            )}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={onCreatePress}
          />
        </ContainerElement>
      </View>
    </View>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  headerContainer: {
    height: 253,
    backgroundColor: lightThemeColors.darkBlue,
    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'orange',
    zIndex: -1,
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
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
