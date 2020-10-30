import React from 'react';
import StorageService from '../services/StorageService';

export const AuthContext = React.createContext();

const Provider = AuthContext.Provider;

class AuthProvider extends React.Component {

  state = {
    authenticatedUser: StorageService.getUser(),
    isAuthenticated: StorageService.isAuthenticated()
  }

  signIn = (user) => {
    StorageService.signIn(user);
    this.setState({isAuthenticated: true, authenticatedUser: user});
    
  }

  signOut = () => {
    StorageService.signOut();
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

