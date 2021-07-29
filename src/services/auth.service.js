import axios from 'axios';
import authHeader from './auth.header';
import decode from 'jwt-decode'
import { URL_BACKEND } from '../config/config';

const API_URL = URL_BACKEND + '/api/v1/';

class AuthService {

  //logging for a user
  login(user) {
    return axios
      .post(API_URL + 'accounts/login/', {
        login: user.username,
        password: user.password
      }, {
        emulateJSON: true
      })
      .then(response => {

        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  //get token from a user
  getToken(user) {
    return axios
      .post(API_URL + 'token/', {
        username: user.username,
        password: user.password
      })
      .then(response => {
   
        let tokenDecoded = decode(response.data.access)
        if (response.data.access) {
          tokenDecoded["accessToken"] = response.data.access
          localStorage.setItem('user', JSON.stringify(tokenDecoded));

        }

        return response.data;
      });
  }

  //logout a user
  logout() {
    return axios
      .post(API_URL + 'accounts/logout/', {},
        {
          headers: authHeader()
        })
      .then(response => {
        localStorage.removeItem('user');
        return response.data
      },
        error => {
          localStorage.removeItem('user');
          return error;
        });

  }

  //Sign up a user
  async register(user) {
    return axios.post(API_URL + 'accounts/register/', {
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirm: user.password,
    }, {
      emulateJSON: true
    })
      .catch(function (error) {

        var reasonError = 'Unknown';

        if ("email" in error.response.data)
          reasonError = error.response.data.email;
        else if ("password1" in error.response.data)
          reasonError = error.response.data.password1[0];
        else if ("username" in error.response.data)
          reasonError = error.response.data.username;

        return Promise.reject(new Error(reasonError));
      });
  }

  //Enregistrement d'un utilisateur
  async passwordReset(user) {

    return axios.post(API_URL + 'accounts/reset-password/', {
      email: user.email,
    }, {
      emulateJSON: true
    })
      .then(response => {
        return response.data;
      })
      .catch(function (error) {

        var reasonError = 'Unknown';

        if ("email" in error.response.data)
          reasonError = error.response.data.email;
        else if ("password1" in error.response.data)
          reasonError = error.response.data.password1[0];
        else if ("username" in error.response.data)
          reasonError = error.response.data.username;

        return Promise.reject(new Error(reasonError));
      });
  }
}

export default new AuthService();