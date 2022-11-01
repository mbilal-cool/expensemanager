import {navigate} from '../Navigation/mainNavigation';
import axios from 'axios';

class AuthController {
  static handleSignupUser = call_back => {
    AuthController.signUpRequest()
      .then(res => {
        res ? navigate('LogInScreen') : null;
      })
      .catch(err => {
        console.log(err), call_back(err);
      });
  };
  static signUpRequest = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          resolve(response.status);
        })
        .catch(error => {
          reject(error);
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
