import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const PencilIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 17;
  const defaultHeight = height ? height : 16;
  const defaultColor = color ? color : lightThemeColors.black1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.89844 11.9611L11.8036 2.05566L14.444 4.69606L4.53856 14.6012L1.89844 11.9611Z" fill="${defaultColor}"/>
      <path d="M15.5762 3.56462L15.9534 3.18746C16.306 2.83484 16.5002 2.36619 16.5002 1.8674C16.5002 1.36861 16.306 0.899958 15.9534 0.547337C15.6007 0.194715 15.1318 0 14.633 0C14.1342 0 13.6656 0.194449 13.3127 0.54707L12.9355 0.924231L15.5762 3.56462Z" fill="${defaultColor}"/>
      <path d="M1.59344 12.4102L0.513706 15.6488C0.481698 15.7446 0.506771 15.8505 0.578256 15.9217C0.628935 15.9724 0.697219 15.9999 0.766836 15.9999C0.79511 15.9999 0.823384 15.9953 0.851124 15.986L4.08953 14.9065L1.59344 12.4102Z" fill="${defaultColor}"/>
      <path d="M12.1816 1.67919L12.5591 1.30176L15.1995 3.94215L14.822 4.31958L12.1816 1.67919Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default PencilIconSvg;
