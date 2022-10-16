import {Platform} from 'react-native';
export const lightThemeColors = {
  defaultBackground: '#F5F5F5',
  red: '#ff0000',
  white: '#ffffff',
  white2: 'rgba(255, 255, 255, 0.9)',
  black: '#000000',
  grey: '#CED4DA',
  grey1: '#ADB5BD',
  grey2: '#ebebeb',
  grey3: '#6C757D',
  grey4: '#E9ECEF',
  grey5: 'rgba(0, 0, 0, 0.5)',
  red1: '#EF5455',
  red2: '#d00000',
  black1: '#293151',
  blue: '#0075FF',
  darkBlue: '#293151',
  darkBlue1: '#333F6B',
  darkBlue2: '#6276BF',
  pink: 'rgba(239, 84, 85,0.25)',
  skyBlueLight: '#F3F9FF',
};
export const darkThemeColors = {
  ...lightThemeColors,
  defaultBackground: '#131313', //
  white: '#0d0d0d', //
  white2: 'rgba(255, 255, 255, 0.9)',
  black: 'white', //
  grey: '#303840',
  grey1: '#ADB5BD',
  grey2: '#212121',
  grey3: '#6C757D',
  grey4: '#1B2025',
  grey5: 'rgba(255, 255, 255, 0.5)',
  red1: '#f16b6b',
  red2: '#ea0000',
  black1: '#adb5bd',
  blue: '#0075FF',
  darkBlue: '#323B62', //
  darkBlue1: '#3C497D',
  darkBlue2: '#6276BF',
  pink: 'rgba(239, 84, 85,0.25)',
  skyBlueLight: '#131313',
};

export const Fonts = {
  interRegular: Platform.OS === 'ios' ? 'Inter-Regular' : 'InterRegular',
  interBold: Platform.OS === 'ios' ? 'Inter-Bold' : 'InterBold',
  interItalic: Platform.OS === 'ios' ? 'Inter-Italic' : 'InterItalic',
  arialBold: Platform.OS === 'ios' ? 'Arial-Bold' : 'ArialBold',
};
