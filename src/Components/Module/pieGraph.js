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

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
const PieGraphV2 = ({onPressSector, data}) => {
  const {colors} = useTheme();
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
    if (data) {
      let preparedArray = undefined;
      preparedArray = data.map((item, index) => {
        const sectorPercentage = (item.amount / 10000) * 100;
        return {
          x: item.amount <= 200 ? null : index,
          y: sectorPercentage,
          label: item.amount <= 2000 ? `\u0020` : `$${item.amount}`,
          titleWithPercentage: `${sectorPercentage}%\u0020 ${item.name}`,
          color: colorArray[index],
        };
      });

      setDataPieChart(preparedArray);
    }
  }, [data]);

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
      <VictoryPie
        dataComponent={
          <Slice events={{onPressSector: () => console.log('hello')}} />
        }
        // labels={({datum}) => console.log(datum)}
        containerComponent={<VictoryContainer responsive={false} />}
        labelPlacement={'parallel'}
        labelRadius={50}
        data={dataPieChart}
        labelPosition={'centroid'}
        colorScale={dataPieChart.map(item => item.color)}
        height={width * 0.76}
        width={width * 0.76}
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
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: () => {
                // labelOutside === true ? SetShowLabel(true) : null;
                return [
                  {
                    target: 'data',
                    mutation: props => {
                      onPressSector(true, props.datum);
                    },
                  },
                ];
              },
            },
          },
        ]}
      />
      <View
        style={{
          // backgroundColor: 'yellow',
          height: 210,
          width: 120,
          position: 'absolute',
          // alignItems: 'center',
          justifyContent: 'center',
          top: '12%',
          right: -150,
        }}>
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
                    borderRadius: 5,
                    backgroundColor: item.color,
                  }}></View>
                <Text
                  style={{
                    fontFamily: Fonts.interRegular,
                    fontWeight: '400',
                    fontSize: width * 0.025,
                    color: colors.black,
                    marginLeft: 10,
                  }}>
                  {item.titleWithPercentage}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PieGraphV2;

const styles = StyleSheet.create({});
