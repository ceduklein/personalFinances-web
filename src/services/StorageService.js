import api from '../api/api'

const storageKey = '@MyFinances:user';

export default class AuthService {
  
  static signIn(user) {
    localStorage.setItem(storageKey, JSON.stringify(user));
    api.defaults.headers.authorization = `Bearer ${user.token}`;
  }

  static signOut() {
    localStorage.removeItem(storageKey);
  }

  static getUser() {
    const user = localStorage.getItem(storageKey);
    return JSON.parse(user);
  }

  static isAuthenticated() {
    const loggedUser = JSON.parse(localStorage.getItem(storageKey));
    if(loggedUser) {
      api.defaults.headers.authorization = `Bearer ${loggedUser.token}`;
      return true
    } else {
      return false;
    }
  }


}