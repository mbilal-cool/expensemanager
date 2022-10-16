import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const HelpIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 12;
  const defaultHeight = height ? height : 12;
  const defaultColor = color ? color : lightThemeColors.red1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.00033 0.166992C2.78383 0.166992 0.166992 2.78383 0.166992 6.00033C0.166992 9.21683 2.78383 11.8337 6.00033 11.8337C9.21683 11.8337 11.8337 9.21683 11.8337 6.00033C11.8337 2.78383 9.21683 0.166992 6.00033 0.166992ZM6.58366 9.50033H5.41699V8.33366H6.58366V9.50033ZM7.15299 6.65074C7.03866 6.74291 6.92841 6.83099 6.84091 6.91849C6.60291 7.15591 6.58424 7.37174 6.58366 7.38108V7.45866H5.41699V7.36124C5.41699 7.29241 5.43391 6.67466 6.01549 6.09308C6.12924 5.97933 6.27041 5.86383 6.41858 5.74366C6.84674 5.39658 7.12791 5.14341 7.12791 4.79458C7.12113 4.49989 6.99929 4.21955 6.78845 4.01356C6.57761 3.80757 6.29452 3.69227 5.99975 3.69235C5.70498 3.69243 5.42195 3.80787 5.21122 4.01397C5.00048 4.22007 4.87878 4.50047 4.87216 4.79516H3.70549C3.70549 3.52991 4.73508 2.50033 6.00033 2.50033C7.26558 2.50033 8.29516 3.52991 8.29516 4.79516C8.29516 5.72674 7.60741 6.28266 7.15299 6.65074Z" fill="${defaultColor}"/>
      </svg>
      
      
             
               `}
    />
  );
};

export default HelpIconSvg;
