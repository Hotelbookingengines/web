import React from 'react';
import cookie from 'react-cookies';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'Not yet Login'
    };
  }
  componentWillMount() {
    if (cookie.load('userId')) {
      this.setState({ userId: cookie.load('userId') });
    }
  }
  render() {
    return (
     
      <header className="App-header">
       
        <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <img src={logo} className="App-logo" alt="logo" />
              <h3>Group Hotel Booking</h3>
            </div>
          </div>
          <div className="col-4">
            <p className="text-right">{this.state.userId}</p>
          </div>
        </div>
        </div>
      </header>
      
    );
  }
}

export default Header;
