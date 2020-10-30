import React from 'react';
import { FiLogOut } from 'react-icons/fi'

import NavBarItem from './navBarItem';

import { AuthContext } from '../main.js/AuthProvider';

class Navbar extends React.Component {

  render() {

    return(
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
          style={{fontSize: 20}}>
        <div className="container">
          <a href="#/" className="navbar-brand" style={{fontSize: 25}}>Finanças Pessoais</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarResponsive" 
            aria-controls="navbarResponsive" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavBarItem render={this.context.isAuthenticated} href="#/" title="Dashboard"/>
              <NavBarItem render={this.context.isAuthenticated} href="#/posting-list" title="Lançamentos"/>
              <NavBarItem render={this.context.isAuthenticated}
                          onClick={this.context.signOut} 
                          title={<span>Sair <FiLogOut size={18} /></span>}
                          href="#/signin" />
            </ul>
          </div>
  
        </div>

      </div>
    )
  }
}

Navbar.contextType = AuthContext;

export default Navbar;