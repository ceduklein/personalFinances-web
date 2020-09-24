import React from 'react';
import NavBarItem from './navBarItem';

export default class Navbar extends React.Component {
  render() {
    return(
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
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
              <NavBarItem href="#/" title="Home"/>
              <NavBarItem href="#/" title="Lançamentos"/>
              <NavBarItem href="#/signin" title="Sign In"/>
            </ul>
          </div>
  
        </div>
      </div>
    )
  }
}