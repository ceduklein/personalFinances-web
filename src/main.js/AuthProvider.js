import React from 'react';
import AuthService from '../services/authService';

export const AuthContext = React.createContext();

const Provider = AuthContext.Provider;


class AuthProvider extends React.Component {

  state = {
    authenticatedUser: AuthService.getUser(),
    isAuthenticated: AuthService.isAuthenticated()
  }

  signIn = (user) => {
    AuthService.signIn(user);
    this.setState({isAuthenticated: true, authenticatedUser: user});
  }

  signOut = () => {
    AuthService.signOut();
    this.setState({isAuthenticated: false, authenticatedUser: null});
  }

  render() {
    const contextProps = {
      authenticatedUser: this.state.authenticatedUser,
      isAuthenticated: this.state.isAuthenticated,
      signIn: this.signIn,
      signOut: this.signOut
    }

    return(
      <Provider value={contextProps}>
        {this.props.children}
      </Provider>
    )
  }
}

export default AuthProvider;

