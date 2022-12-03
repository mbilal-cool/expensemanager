import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  Slice,
} from 'victory-native';
import {Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {expenseList} from '../../mockData';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const PieGraphV2 = ({onPressSector, data, loading}) => {
  const expenses = useSelector(state => state.expense.allExpenses);
  const {colors} = useTheme();
  const [padAngle, setPadAngle] = useState();
  const [dataPieChart, setDataPieChart] = useState(data);
  const colorArray = [
    '#BF4344',
    '#EF5455',
    '#FDEEEE',
    '#FACCCC',
    '#F7AAAA',
    '#BF4344',
    '#EF5455',
    '#BF4344',
    '#EF5455',
    '#FDEEEE',
    '#FACCCC',
    '#F7AAAA',
    '#BF4344',
    '#EF5455',
    '#EF5455',
    '#FDEEEE',
    '#FACCCC',
    '#F7AAAA',
    '#BF4344',
    '#EF5455',
  ];
  useEffect(() => {
    let preparedArray = undefined;
    preparedArray = expenses.map((item, index) => {
      const sectorPercentage = Math.round((item.amount / 100000) * 100);
      // const sectorPercentage = item.amount;
      return {
        x: item.amount <= 200 ? null : index,
        y: sectorPercentage,
        label: item.amount <= 2000 ? `\u0020` : `$${item.amount}`,
        titleWithPercentage: `${sectorPercentage}%\u0020 ${item.expenseName}`,
        color: colorArray[index],
      };
    });
    setDataPieChart(preparedArray);
  }, [expenses]);
  return (
    <View
      style={{
        // width: '50%',
        alignItems: 'center',
        // backgroundColor: 'red',
        // paddingRight: 30,
        marginRight: 50,
        justifyContent: 'center',
      }}>
      {loading === true ? (
        <SkeletonPlaceholder
          borderRadius={4}
          backgroundColor={colors.white}
          highlightColor={'#F4f4f9'}
          speed={1200}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={width * 0.55}
              height={width * 0.55}
              borderRadius={200}
              marginTop={60}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <>
          <VictoryPie
            containerComponent={<VictoryContainer responsive={false} />}
            labelPlacement={'parallel'}
            labelRadius={50}
            data={dataPieChart}
            labelPosition={'centroid'}
            colorScale={dataPieChart.map(item => item.color)}
            height={width * 0.86}
            width={width * 0.81}
            style={{
              data: {fillOpacity: 0.9, stroke: colors.white, strokeWidth: 1},
              labels: {
                lineHeight: 15,
                fontFamily: Fonts.interBold,
                fill: 'white',
                fontSize: ({text}) => (text > '$3000' ? width * 0.03 : 9),
                fontWeight: '500',
              },
              parent: {border: '1px solid #ccc'},
            }}
            // events={[
            //   {
            //     target: 'data',
            //     eventHandlers: {
            //       onPress: () => {
            //         return [
            //           {
            //             target: 'data',
            //             mutation: props => {
            //               onPressSector(true, props.datum);
            //             },
            //           },
            //         ];
            //       },
            //     },
            //   },
            // ]}
          />
        </>
      )}
      <View
        style={{
          // backgroundColor: 'yellow',
          height: 210,
          width: 120,
          position: 'absolute',
          // alignItems: 'center',
          justifyContent: 'center',
          top: 65,
          right: -130,
          paddingLeft: 5,
        }}>
        {loading ? (
          <SkeletonPlaceholder
            backgroundColor={colors.white}
            highlightColor={'#F4f4f9'}
            speed={1200}>
            <SkeletonPlaceholder.Item alignItems="center">
              <SkeletonPlaceholder.Item
                width={'90%'}
                height={20}
                marginBottom={20}
              />
              <SkeletonPlaceholder.Item
                width={'90%'}
                height={20}
                marginBottom={20}
              />

              <SkeletonPlaceholder.Item
                width={'90%'}
                height={20}
                marginBottom={20}
              />
              <SkeletonPlaceholder.Item
                width={'90%'}
                height={20}
                marginBottom={20}
              />
              <SkeletonPlaceholder.Item
                width={'90%'}
                height={20}
                marginBottom={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView
            bounces={false}
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}>
            {dataPieChart.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 40,
                    width: '100%',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 15,
                      backgroundColor: item.color,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: Fonts.interRegular,
                      fontWeight: '400',
                      fontSize: width * 0.025,
                      color: colors.black,
                      marginLeft: 5,
                    }}>
                    {item.titleWithPercentage}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default PieGraphV2;

const styles = StyleSheet.create({});
