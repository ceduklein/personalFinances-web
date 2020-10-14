export const storageKey = '@MyFinances:user';

export default class AuthService {
  
  static signIn(user) {
    localStorage.setItem(storageKey, JSON.stringify(user));
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
      return true
    } else {
      return false;
    }
  }


}