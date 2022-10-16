import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';

const THEME_COLOR = 'THEME_COLOR';
const CHANGE_THEME_LISTENER = 'CHANGE_THEME_LISTENER';

class ThemeController {
  static settingTheme = value => {
    EventRegister.emit(CHANGE_THEME_LISTENER, value);
    AsyncStorage.setItem(THEME_COLOR, value == true ? 'dark' : 'light');
  };

  static listeningToChange = (_callback = () => false) => {
    EventRegister.addEventListener(CHANGE_THEME_LISTENER, data => {
      _callback(data);
    });
  };

  static removingListener = () => {
    EventRegister.removeEventListener(CHANGE_THEME_LISTENER);
  };

  static checkAsyncAndSetPreviousMode = () => {
    AsyncStorage.getItem(THEME_COLOR)
      .then(result => {
        if (result != null) {
          if (result == 'dark') {
            EventRegister.emit(CHANGE_THEME_LISTENER, true);
            AsyncStorage.setItem(THEME_COLOR, 'dark');
          } else if (result == 'light') {
            EventRegister.emit(CHANGE_THEME_LISTENER, false);
            AsyncStorage.setItem(THEME_COLOR, 'light');
          }
        }
      })
      .catch(error => {
        console.log(error, 'Error in getting AsyncStorage Value');
      });
  };
}

export default ThemeController;
