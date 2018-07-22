import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import cookie from 'react-cookies';


import Header from './common/header';
import Footer from './common/footer';

import Login from './login/login';
import Logout from './login/logout';
import Profile from './login/profile';

import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: cookie.load('userId')    
    };
   
  }

  

  render() {
    let button;

    if (this.state.userId) {
      
      button = <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={'/profile'}>Profile</Link></li>
        <li className="breadcrumb-item"><Link to={'/profile/logout'}>Logout</Link></li>
      </ol>;

  } else {
    
      button = 
      <ol className="breadcrumb">
       
        <li className="breadcrumb-item"><Link to={'/profile/login'}>Login</Link></li>
        </ol>;
      
    }

    return (
      <div className="App">
        <Header />
        <div className="container">
          <Router>
            <div className="rows">
              <nav aria-label="breadcrumb">
                {button}
              </nav>
              <Switch>
                <Route exact path='/profile/' component={Profile} />
                <Route exact path='/profile/login' component={Login} />
                <Route exact path='/profile/logout' component={Logout} />
              </Switch>
            </div>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;