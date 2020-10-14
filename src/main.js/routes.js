import React from 'react';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import PostingSearch from '../pages/postingSearch';
import Posting from '../pages/posting';
import { AuthContext } from './AuthProvider';


function AuthRoute({ component: Component, isAuthenticated, ...props }) {
  return (
    <Route {...props} render={(componentProps) => {
      // console.log(isAuthenticated)
      if(isAuthenticated) {
        return(
          <Component {...componentProps} />
        )
      } else {
        return(
          <Redirect to={ {pathname: '/signin', state: {from: componentProps.location} } } />
        )
      }
    }} />
  )
}

class Routes extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />

          <AuthRoute isAuthenticated={this.context.isAuthenticated}
                     path="/home" 
                     component={Home} />
          <AuthRoute isAuthenticated={this.context.isAuthenticated} 
                     path="/posting-list"
                     component={PostingSearch} />
          <AuthRoute isAuthenticated={this.context.isAuthenticated}
                     path="/posting/:id?" 
                     component={Posting} />

        </Switch>
      </HashRouter>
    )
  }
}

Routes.contextType = AuthContext;

export default Routes;