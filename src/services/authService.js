export const storageKey = '@MyFinances:user';

export default class AuthService {
  
  signIn(user) {
    localStorage.setItem(storageKey, JSON.stringify(user));
  }

  signOut() {
    localStorage.removeItem(storageKey);
  }

  getUser() {
    const user = localStorage.getItem(storageKey);
    return JSON.parse(user);
  }

  isAuthenticated() {
    const loggedUser = JSON.parse(localStorage.getItem(storageKey));
    return loggedUser && loggedUser.id;
  }


}