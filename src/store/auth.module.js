import AuthService from '@/services/auth.service';
import decode from 'jwt-decode'

var user = localStorage.getItem('user');

if(user!=null)
  user=JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state :initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    token({ commit }, user) {
      return AuthService.getToken(user).then(
        user => {
          commit('tokenSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('tokenFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }, user) {
      AuthService.logout(user).then(
        user => {
          commit('logout');
          return Promise.resolve(user);
        },
        error => {
          commit('logoutFailure');
          return Promise.reject(error);
        }
      );
      
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          console.log(response)
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          console.log(error)
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    passwordReset({ commit },user) {
      return AuthService.passwordReset(user).then(
        response => {
          //console.log(response)
          commit('passwordResetSuccess'); 
          return Promise.resolve(response.data);
        },
        error => {
          //console.log(error)
          commit('passwordResetFailure');
          return Promise.reject(error);
        }
      );
    },

    isTokenExpired({ commit }, user)
    {
        let token = decode(user.tokenValidity)
        if (!token.exp) {
            return null
        }
    
        let date = new Date(0)
        date.setUTCSeconds(token.exp)

        if(!(date < new Date()))
            commit('logout');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    tokenSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    tokenFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logoutFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    passwordResetSuccess(state) {
      state.status.loggedIn = false;
    },
    passwordResetFailure(state) {
      state.status.loggedIn = false;
    }
  }
};