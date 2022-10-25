import React, {useRef} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {Fonts} from '../../theme';

import AbstractButton from './abstractButton';
import {useTheme} from '@react-navigation/native';
const AbstractBottomSheet = props => {
  const {colors} = useTheme();
  return (
    <ActionSheet
      // overdrawEnabled={false}
      onClose={() => props.onClose()}
      id={props.id}
      statusBarTranslucent={true}
      openAnimationSpeed={5}
      // bounceOnOpen={true}
      containerStyle={{
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 20,
      }}
      // bounciness={5}
      drawUnderStatusBar={false}
      // indicatorStyle={{width: 70, height: 3.7, marginTop: 10}}
      // CustomHeaderComponent={props.MyHeader}
      overlayColor={'black'}
      defaultOverlayOpacity={0.4}>
      {props.children}
      {props.appendButton ? (
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 20,
            width: '97%',
            alignSelf: 'center',
          }}>
          <AbstractButton
            backgroundColor={colors.red1}
            height={50}
            title={props.buttonTitle ? props.buttonTitle : 'Add'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={props.onButtonPress}
          />
        </View>
      ) : null}
    </ActionSheet>
  );
};
export default AbstractBottomSheet;
