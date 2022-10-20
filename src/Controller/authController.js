import {navigate} from '../Navigation/mainNavigation';
import axios from 'axios';
const baseUrl = 'https://reqres.in';
class AuthController {
  ////Abgjdbfjsb
  static handleSignupUser = () => {
    AuthController.signUpRequest()
      .then(res => console.log('hh', res), navigate('LogInScreen'))
      .catch(err => console.log('hh', err));
  };
  static signUpRequest = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
        .then(response => {
          resolve(response.status);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  static handleLogin = (email = 'chumar', password = '1234') => {
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
