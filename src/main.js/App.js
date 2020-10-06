import React from 'react';

import 'bootswatch/dist/darkly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
