import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';

const Calender1IconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : 16;
  const defaultHeight = height ? height : 15;
  const defaultColor = 'white';

  return (
    <SvgXml
      xml={`<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.16667 17.3337H13.8333C14.7525 17.3337 15.5 16.5862 15.5 15.667V4.00033C15.5 3.08116 14.7525 2.33366 13.8333 2.33366H12.1667V0.666992H10.5V2.33366H5.5V0.666992H3.83333V2.33366H2.16667C1.2475 2.33366 0.5 3.08116 0.5 4.00033V15.667C0.5 16.5862 1.2475 17.3337 2.16667 17.3337ZM7.16667 14.3453L4.0775 11.2562L5.25583 10.0778L7.16667 11.9887L10.7442 8.41116L11.9225 9.58949L7.16667 14.3453ZM2.16667 4.83366H13.8333V6.50033H2.16667V4.83366Z" fill="#ADB5BD"/>
      </svg>
      
             
               `}
    />
  );
};

export default Calender1IconSvg;
