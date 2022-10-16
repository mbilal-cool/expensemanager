import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const ArrowLeftTailSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 14;
  const defaultHeight = height ? height : 10;
  const defaultColor = color ? color : lightThemeColors.black;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 4.99965C14 4.86705 13.9473 4.73987 13.8536 4.6461C13.7598 4.55233 13.6326 4.49965 13.5 4.49965H1.707L4.854 1.35366C4.94789 1.25977 5.00063 1.13243 5.00063 0.999655C5.00063 0.866879 4.94789 0.739542 4.854 0.645655C4.76011 0.551768 4.63278 0.499023 4.5 0.499023C4.36722 0.499023 4.23989 0.551768 4.146 0.645655L0.146 4.64565C0.0994368 4.6921 0.0624943 4.74728 0.0372877 4.80802C0.0120811 4.86877 -0.000893593 4.93389 -0.000893593 4.99965C-0.000893593 5.06542 0.0120811 5.13054 0.0372877 5.19129C0.0624943 5.25203 0.0994368 5.30721 0.146 5.35365L4.146 9.35365C4.23989 9.44754 4.36722 9.50029 4.5 9.50029C4.63278 9.50029 4.76011 9.44754 4.854 9.35365C4.94789 9.25977 5.00063 9.13243 5.00063 8.99965C5.00063 8.86688 4.94789 8.73954 4.854 8.64565L1.707 5.49965H13.5C13.6326 5.49965 13.7598 5.44698 13.8536 5.35321C13.9473 5.25944 14 5.13226 14 4.99965Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default ArrowLeftTailSvg;
