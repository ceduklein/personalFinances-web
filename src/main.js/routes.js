import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import SignIn from '../views/signIn';
import SignUp from '../views/signUp';


export default class Routes extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </HashRouter>
    )
  }
}