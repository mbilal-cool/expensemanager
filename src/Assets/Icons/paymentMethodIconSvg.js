import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const PaymentMethodIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 18;
  const defaultHeight = height ? height : 14;
  const defaultColor = color ? color : lightThemeColors.grey1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1687 7.83301C13.6289 7.83301 14.002 8.2061 14.002 8.66634C14.002 9.0937 13.6803 9.44593 13.2658 9.49407L13.1687 9.49967H3.5145L6.25792 12.2438C6.55832 12.5442 6.58143 13.0168 6.32724 13.3438L6.25792 13.4223C5.95751 13.7227 5.48482 13.7458 5.15791 13.4916L5.07941 13.4223L0.91274 9.2556C0.410595 8.75345 0.72894 7.91036 1.4073 7.83799L1.502 7.83301H13.1687ZM12.8444 0.507762L12.9229 0.577086L17.0896 4.74375C17.5917 5.2459 17.2734 6.08899 16.595 6.16136L16.5003 6.16634H4.83366C4.37342 6.16634 4.00033 5.79324 4.00033 5.33301C4.00033 4.90564 4.32203 4.55342 4.73647 4.50528L4.83366 4.49967H14.4878L11.7444 1.7556C11.444 1.45519 11.4209 0.982501 11.6751 0.655592L11.7444 0.577086C12.0448 0.276682 12.5175 0.253574 12.8444 0.507762Z" fill="${defaultColor}"/>
      </svg>
      
      
             
               `}
    />
  );
};

export default PaymentMethodIconSvg;
