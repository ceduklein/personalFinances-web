import React from 'react';
import NavBarItem from './navBarItem';

export default class Navbar extends React.Component {
  render() {
    return(
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
          style={{fontSize: 20}}>
        <div className="container">
          <a href="#/home" className="navbar-brand" style={{fontSize: 25}}>Finanças Pessoais</a>
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
              <NavBarItem href="#/home" title="Home"/>
              <NavBarItem href="#/posting-list" title="Relatórios"/>
              <NavBarItem href="#/signin" title="Sign In"/>
            </ul>
          </div>
  
        </div>
      </div>
    )
  }
}