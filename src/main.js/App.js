import React from 'react';

import 'bootswatch/dist/slate/bootstrap.css';
import '../custom.css';

import Navbar from '../components/navBar';
import Routes from './routes';

class App extends React.Component {
  render(){
    return(
      <>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </>
    )
  }
}

export default App;
