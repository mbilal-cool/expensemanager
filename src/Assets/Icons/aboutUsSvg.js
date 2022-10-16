import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const AboutIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 12;
  const defaultHeight = height ? height : 12;
  const defaultColor = color ? color : lightThemeColors.red1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C9.3137 0 12 2.68629 12 6C12 9.3137 9.3137 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0ZM6 4.5C5.72385 4.5 5.5 4.72385 5.5 5V9C5.5 9.27615 5.72385 9.5 6 9.5C6.27615 9.5 6.5 9.27615 6.5 9V5C6.5 4.72385 6.27615 4.5 6 4.5ZM6 2.375C5.6548 2.375 5.375 2.65482 5.375 3C5.375 3.34518 5.6548 3.625 6 3.625C6.3452 3.625 6.625 3.34518 6.625 3C6.625 2.65482 6.3452 2.375 6 2.375Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default AboutIconSvg;
