import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const PlusIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 12;
  const defaultHeight = height ? height : 12;
  const defaultColor = color ? color : lightThemeColors.white;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.21721 0V4.89552H12V7.0806H7.21721V12H4.7582V7.0806H0V4.89552H4.7582V0H7.21721Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default PlusIconSvg;
