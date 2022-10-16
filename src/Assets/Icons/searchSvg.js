import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../theme';

const SearchIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 16;
  const defaultHeight = height ? height : 17;
  const defaultColor = color ? color : lightThemeColors.grey1;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7983 15.3664L11.2077 10.7688C12.1127 9.68251 12.657 8.29434 12.657 6.77819C12.657 3.31927 9.82068 0.506836 6.3318 0.506836C2.84291 0.506836 0 3.32255 0 6.78147C0 10.2404 2.83636 13.0528 6.32524 13.0528C7.80736 13.0528 9.17143 12.5442 10.2535 11.6942L14.8605 16.305C15.1294 16.5741 15.5295 16.5741 15.7983 16.305C16.0672 16.0359 16.0672 15.6355 15.7983 15.3664ZM1.3444 6.78147C1.3444 4.06421 3.58069 1.85562 6.32524 1.85562C9.06978 1.85562 11.3061 4.06421 11.3061 6.78147C11.3061 9.49873 9.06978 11.7073 6.32524 11.7073C3.58069 11.7073 1.3444 9.49545 1.3444 6.78147Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default SearchIconSvg;
