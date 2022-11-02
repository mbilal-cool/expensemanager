import {navigate} from '../Navigation/mainNavigation';
import axios from 'axios';
const baseUrl = 'https://expensemanagementsys.herokuapp.com/';
const params = {
  username: 'Muhammad Bilal',
  email: 'mianBilal@gmail.com',
  password: 'kitkat123',
  roles: ['admin'],
};

class AuthController {
  static handleSignupUser = _call_back => {
    AuthController.signUpRequest()
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
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
  static signUpRequest = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://expensemanagementsys.herokuapp.com/api/auth/signup',

          {
            username: 'Muhammad Bilal',
            email: 'mianBilal123@gmail.com',
            password: 'kitkat123',
            roles: ['admin'],
          },
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject('Network Error');
        });
    });
  };

  static handleLogin = (email = 'mbilal', password = '1234') => {
    AuthController.requestLogin()
      .then(res => {
        if (res.success) {
          AuthController.persistUserAndAuthenticate(res)
            .then(dataIsSaved => {
              navigate('home');
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  static requestLogin = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          email: 'chumar',
          password: '1234',
          pic: 'https.com',
        });
      }, 5000);
    });
  };

  static persistUserAndAuthenticate = user => {
    return new Promise((resolve, reject) => {
      asyncStorage
        .setItem('', user)
        .then(res => {
          redux.save(user);
          resolve(true);
        })
        .catch(err => reject(err));
    });
  };

  static handleRestoreUserAndAuthenticate = () => {
    return new Promise((resolve, reject) => {
      asyncStorage
        .getItem('')
        .then(res => {
          if (res) {
            redux.save(user);
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
}

export default AuthController;
