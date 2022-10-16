import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../../theme';

const MoreIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 24;
  const defaultHeight = height ? height : 25;
  const defaultColor = color ? color : lightThemeColors.grey;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.99998 0.5H3C1.34602 0.5 0 1.84602 0 3.5V7.49998C0 9.15397 1.34602 10.5 3 10.5H6.99998C8.65397 10.5 9.99998 9.15397 9.99998 7.49998V3.5C9.99998 1.84602 8.65402 0.5 6.99998 0.5Z" fill="${defaultColor}"/>
      <path d="M21 0.5H17C15.346 0.5 14 1.84602 14 3.5V7.49998C14 9.15397 15.346 10.5 17 10.5H21C22.654 10.5 24 9.15397 24 7.49998V3.5C24 1.84602 22.654 0.5 21 0.5Z" fill="${defaultColor}"/>
      <path d="M6.99998 14.5H3C1.34602 14.5 0 15.846 0 17.5V21.5C0 23.154 1.34602 24.5 3 24.5H6.99998C8.65397 24.5 9.99998 23.154 9.99998 21.5V17.5C9.99998 15.846 8.65402 14.5 6.99998 14.5Z" fill="${defaultColor}"/>
      <path d="M23 18.5H20V15.5C20 14.948 19.553 14.5 19 14.5C18.447 14.5 18 14.948 18 15.5V18.5H15C14.447 18.5 14 18.948 14 19.5C14 20.052 14.447 20.5 15 20.5H18V23.5C18 24.052 18.447 24.4999 19 24.4999C19.553 24.4999 20 24.052 20 23.5V20.5H23C23.5529 20.5 23.9999 20.052 23.9999 19.5C23.9999 18.948 23.553 18.5 23 18.5Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default MoreIconSvg;
