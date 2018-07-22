import React from 'react';
import cookie from 'react-cookies';

class logoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      hotelifo: []
    };
  }
  componentWillMount() {
    this.setState({ userId: cookie.load('userId') });
    cookie.remove('userId', { path: '/' })
  }

  render() {
    const { error, isLoaded, userId } = this.state;

    console.log("==============");
    console.log(cookie.load('userId'));
    console.log("==============");

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          <div className="card">
            <div className="card-header">
              Log out
            </div>
            <div className="card-body">
              <h5 className="card-title">Email ID :   {userId}</h5>
              <p className="card-text">You Have Successfully Logged Out Of Your Account</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default logoutView;