import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const ArrowRightIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 5;
  const defaultHeight = height ? height : 8;
  const defaultColor = color ? color : lightThemeColors.red1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L4 4L1 1" stroke="${defaultColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default ArrowRightIconSvg;
