import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

const ArrowUpIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 6;
  const defaultHeight = height ? height : 10;
  const defaultColor = '#d00000';

  return (
    <SvgXml
      xml={`<svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00039 9.375C3.08327 9.375 3.16276 9.34208 3.22137 9.28347C3.27997 9.22487 3.31289 9.14538 3.31289 9.0625V1.69187L5.27914 3.65875C5.33782 3.71743 5.41741 3.75039 5.50039 3.75039C5.58338 3.75039 5.66297 3.71743 5.72164 3.65875C5.78032 3.60007 5.81329 3.52048 5.81329 3.4375C5.81329 3.35452 5.78032 3.27493 5.72164 3.21625L3.22164 0.716249C3.19262 0.687148 3.15813 0.664059 3.12017 0.648305C3.0822 0.632551 3.0415 0.624441 3.00039 0.624441C2.95929 0.624441 2.91859 0.632551 2.88062 0.648305C2.84266 0.664059 2.80817 0.687148 2.77914 0.716249L0.279145 3.21625C0.220466 3.27493 0.1875 3.35452 0.1875 3.4375C0.1875 3.52048 0.220466 3.60007 0.279145 3.65875C0.337824 3.71743 0.41741 3.75039 0.500395 3.75039C0.58338 3.75039 0.662966 3.71743 0.721645 3.65875L2.68789 1.69187V9.0625C2.68789 9.14538 2.72082 9.22487 2.77942 9.28347C2.83803 9.34208 2.91751 9.375 3.00039 9.375Z" fill="${defaultColor}"/>
      </svg>
      
      
      
      
      
      
      
          
              
               `}
    />
  );
};

export default ArrowUpIconSvg;
