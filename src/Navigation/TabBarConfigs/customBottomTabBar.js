import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import AbstractBottomTabButton from '../../Components/Abstract/abstractBottomTabButton';
import HomeIconSvg from '../../Assets/Icons/BottomTabSvgs/HomeSvg';
import AllExpensesIconSvg from '../../Assets/Icons/BottomTabSvgs/allExpensesSvg';
import MoreIconSvg from '../../Assets/Icons/BottomTabSvgs/moreSvg';
const {height, width} = Dimensions.get('window');

function CustomBottomTabBar({state, descriptors, navigation}) {
  const {colors} = useTheme();

  return (
    <View style={[styles.wrapper]}>
      <View
        style={[
          styles.bottomTabSContainer,
          styles.shadow,
          {backgroundColor: colors.white},
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          switch (route.name) {
            case 'Home':
              return (
                <View key={index} style={styles.iconBox}>
                  <AbstractBottomTabButton
                    isFocused={isFocused}
                    onPress={onPress}
                    Label={'Home'}
                    labelColor={isFocused ? colors.red1 : colors.grey}
                    Icon={() => (
                      <HomeIconSvg
                        height={21}
                        width={21}
                        color={isFocused ? colors.red1 : null}
                      />
                    )}
                  />
                </View>
              );
            case 'Expenses':
              return (
                <View key={index} style={styles.iconBox}>
                  <AbstractBottomTabButton
                    isFocused={isFocused}
                    labelColor={isFocused ? colors.red1 : colors.grey}
                    onPress={onPress}
                    Label={'Expenses'}
                    Icon={() => (
                      <AllExpensesIconSvg
                        color={isFocused ? colors.red1 : null}
                        height={29}
                        width={29}
                      />
                    )}
                  />
                </View>
              );
            case 'MoreScreen':
              return (
                <View key={index} style={[styles.iconBox]}>
                  <AbstractBottomTabButton
                    isFocused={isFocused}
                    onPress={onPress}
                    Label={'More'}
                    labelColor={isFocused ? colors.red1 : colors.grey}
                    Icon={() => (
                      <MoreIconSvg
                        height={29}
                        width={29}
                        color={isFocused ? colors.red1 : null}
                      />
                    )}
                  />
                </View>
              );

            default:
              return false;
          }
        })}
      </View>
    </View>
  );
}

export default CustomBottomTabBar;
const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.1,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabSContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingHorizontal: 30,
    paddingBottom: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  iconBox: {
    // backgroundColor: 'purple',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingBottom: 20,
  },
});
