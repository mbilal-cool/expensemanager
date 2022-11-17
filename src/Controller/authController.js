import {navigate} from '../Navigation/mainNavigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxDispatchController from './reduxDispatchController';
const setUserinRedux = user => {
  ReduxDispatchController.Auth.SaveUserInRedux(user);
};
class AuthController {
  static USER_ASYNC_KEY = 'STORAGE_KEY';
  static bearerToken = '';
  static handleSignupUser = (user, _call_back) => {
    AuthController.signUpRequest(user)

      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          _call_back(res);
          navigate('LogInScreen');
        } else {
          _call_back(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        _call_back(err);
      });
  };
  static signUpRequest = user => {
    const obj = {
      username: user.name,
      email: user.email,
      password: user.password,
      roles: [user.role],
    };
    // console.log(obj);
    return new Promise((resolve, reject) => {
      axios
        .post('https://expensemanagementsys.herokuapp.com/authApi/signup', obj)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };

  static handleLogin = (obj, call_back, _call_back) => {
    AuthController.requestLogin(obj)
      .then(res => {
        if (res.data.success) {
          call_back(false);

          AuthController.persistUserAndAuthenticate(res.data)
            .then(dataIsSaved => {
              console.log(dataIsSaved, '??????');

              navigate('AppStack');
            })
            .catch(err => _call_back(err));
        } else {
          _call_back(res.data.message);
        }
      })
      .catch(err => {
        console.log(err), _call_back(err);
      });
  };

  static requestLogin = obj => {
    return new Promise((resolve, reject) => {
      axios
        .post('https://expensemanagementsys.herokuapp.com/authApi/login', obj)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };

  static persistUserAndAuthenticate = user => {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(this.USER_ASYNC_KEY, JSON.stringify(user))
        .then(res => {
          setUserinRedux(user);
          axios.defaults.headers.common['Authorization'] =
            user.data.accessToken;
          resolve(true);
        })
        .catch(err => reject(err));
    });
  };

  static handleRestoreUserAndAuthenticate = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.USER_ASYNC_KEY)
        .then(res => {
          if (res) {
            let parsedUserObject = JSON.parse(res);
            axios.defaults.headers.common['Authorization'] =
              parsedUserObject.data.accessToken;

            setUserinRedux(JSON.parse(res));
            navigate('AppStack');
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  static handleLogoutUser = () => {
    AuthController.logoutUser()
      .then(res => {
        if (res) {
          navigate('LogInScreen');
        }
      })
      .catch(err => console.log(err));
  };
  static logoutUser = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(this.USER_ASYNC_KEY)
        .then(res => {
          ReduxDispatchController.Auth.clearUserFromRedux();
          resolve(true);
        })
        .catch(err => reject(err));
    });
  };
}

export default AuthController;
