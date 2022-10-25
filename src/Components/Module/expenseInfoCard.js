import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
import AbstractButton from '../Abstract/abstractButton';
import ExpenseController from '../../Controller/expenseController';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import RefreshIconSvg from '../../Assets/Icons/refreshIconSvg';
const {height, width} = Dimensions.get('window');

const ExpenseInfoCard = ({backgroundColor}) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();

  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setLoading(true);
    ExpenseController.getTotalExpenses(res => {
      setLoading(false), setSuccess(res.success);
    });
  };
  const count = useSelector(state => state.expense.totalExpense);

  return (
    <View
      style={[
        styles.main,
        {
          height: height * 0.2,
          backgroundColor: defaultBackgroundColor,
        },
        styles.Shadow,
      ]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.red1} />
      ) : success ? (
        <>
          <View style={[styles.tile, {height: height * 0.05}]}>
            <Text style={[styles.itemTextStyle, {color: colors.black}]}>
              Total Expenses
            </Text>
          </View>
          <View style={[styles.tile, {height: height * 0.065}]}>
            <Text
              style={[
                styles.priceTag,
                {
                  color: colors.red1,
                  marginLeft: 5,
                },
              ]}>
              {count ? `Rs. \u0020${count}` : 'Rs. 1,000,000'}
            </Text>
          </View>
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <AbstractButton
            backgroundColor={colors.grey}
            height={50}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            renderLeftIcon={() => <RefreshIconSvg height={35} width={35} />}
            width={50}
            borderRadius={50}
            onPress={fetchData}
          />
          <Text style={{marginTop: 0, color: colors.black1}}>Retry!</Text>
        </View>
      )}
    </View>
  );
};

export default ExpenseInfoCard;
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: '62%',
    left: 20,
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 13,
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 9999,
    alignItems: 'center',
  },
  tile: {
    height: 29,
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceTag: {
    fontFamily: Fonts.interBold,
    fontWeight: '700',
    fontSize: 32,
  },
  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 24,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
