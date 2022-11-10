import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import {lightThemeColors} from '../theme';
import ProfileDetailTile from '../Components/Module/profileDetailTile';
import SettingTile from '../Components/Module/settingTile';
import CatalogIconSvg from '../Assets/Icons/catalogSvg';
import MoonIconSvg from '../Assets/Icons/moonSvg';
import SettingIconSvg from '../Assets/Icons/settingSvg';
import HelpIconSvg from '../Assets/Icons/helpSvg';
import AboutIconSvg from '../Assets/Icons/aboutUsSvg';
import {useTheme} from '@react-navigation/native';
import ThemeController from '../Controller/themeController';
import {useEffect} from 'react';
const Setting = ({navigation}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const {colors} = useTheme();

  const handleCatalogPressed = () => {
    navigation.navigate('Catalog');
  };
  const handleSettingPressed = () => {
    navigation.navigate('Setting');
  };
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={colors.defaultBackground}
      />
      <View style={styles.horizontalContainer}></View>
      <View style={styles.middleContainer}>
        <View
          style={[
            styles.horizontalContainer,
            {
              height: 442,
              // backgroundColor: 'green',
              justifyContent: 'space-between',
            },
          ]}></View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  horizontalContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'tranceparent',
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'tranceparent',
  },
});
