import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {lightThemeColors} from '../../../theme';

const HomeIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 19;
  const defaultHeight = height ? height : 19;
  const defaultColor = color ? color : lightThemeColors.grey;

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.47 0.590216C10.199 0.360474 9.85527 0.234375 9.5 0.234375C9.14473 0.234375 8.80099 0.360474 8.53 0.590216L1.03 6.95322C0.863925 7.09401 0.730492 7.26927 0.638968 7.46683C0.547444 7.66438 0.500023 7.87949 0.5 8.09722V17.5002C0.5 17.898 0.658035 18.2796 0.93934 18.5609C1.22064 18.8422 1.60218 19.0002 2 19.0002H6.75C6.94891 19.0002 7.13968 18.9212 7.28033 18.7805C7.42098 18.6399 7.5 18.4491 7.5 18.2502V12.0002H11.5V18.2502C11.5 18.6642 11.836 19.0002 12.25 19.0002H17C17.3978 19.0002 17.7794 18.8422 18.0607 18.5609C18.342 18.2796 18.5 17.898 18.5 17.5002V8.09722C18.5 7.87949 18.4526 7.66438 18.361 7.46683C18.2695 7.26927 18.1361 7.09401 17.97 6.95322L10.47 0.590216Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default HomeIconSvg;
