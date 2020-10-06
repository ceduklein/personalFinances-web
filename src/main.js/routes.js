import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import PostingSearch from '../pages/postingSearch';
import Posting from '../pages/posting';


export default class Routes extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />

          <Route path="/home" component={Home} />
          <Route path="/posting-list" component={PostingSearch} />
          <Route path="/posting" component={Posting} />

        </Switch>
      </HashRouter>
    )
  }
}