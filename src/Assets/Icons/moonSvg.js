import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const MoonIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 14;
  const defaultHeight = height ? height : 14;
  const defaultColor = color ? color : lightThemeColors.red1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7632 8.54618C10.2454 10.3078 5.96554 8.88396 4.20393 5.36608C3.38827 3.73714 3.25678 1.94555 3.69874 0.31543C0.355388 2.14769 -0.966045 6.31115 0.755201 9.74859C2.51681 13.2665 6.79663 14.6903 10.3145 12.9287C12.2035 11.9827 13.4875 10.3105 14.0001 8.42004C13.9217 8.46308 13.8437 8.50611 13.7632 8.54618Z" fill="${defaultColor}"/>
      </svg>
      
             
               `}
    />
  );
};

export default MoonIconSvg;
