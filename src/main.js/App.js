import React from 'react';

import 'bootswatch/dist/darkly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';
import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import AuthProvider from './AuthProvider';
import Navbar from '../components/navBar';
import Routes from './routes';

class App extends React.Component {


  render(){
    return(
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes />
        </div>
      </AuthProvider>
    )
  }
}

export default App;
