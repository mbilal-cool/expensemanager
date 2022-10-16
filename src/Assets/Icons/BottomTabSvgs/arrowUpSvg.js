import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../../theme';

const ArrowUpIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 14;
  const defaultHeight = height ? height : 9;
  const defaultColor = color ? color : lightThemeColors.white;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7.25L7 1.25L13 7.25" stroke="${defaultColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default ArrowUpIconSvg;
