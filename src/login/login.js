import React from 'react';
import { Redirect } from "react-router-dom";
import cookie from 'react-cookies';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      isLogin: false,
      items: [],
      hotelifo: [],
      userId: '' 
    };
    this.updateHotel = this.updateHotel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateHotel(event) {
    var changes = this.state.hotelifo[event.target.name] = event.target.value;
    this.setState({ changes });
  }


  handleSubmit(event) {

    console.log(this.state.hotelifo);
    var params = '';
    params += 'n=' + this.state.hotelifo['email'];
    params += '&p=' + this.state.hotelifo['pwd'];


    fetch("http://localhost/api/profile/login.php?" + params)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            isLogin: result.check
          });
          if (result.ids) {
            cookie.save('userId', result.ids, { path: '/' })
          }
        },
        (error) => {
          this.setState({
            isLoaded: false,
            isLogin: false,
            error
          });
        }
      )
    event.preventDefault();

  }

  render() {
    const { error, isLoaded,  isLogin, items } = this.state;

    console.log("==============");
    console.log(cookie.load('userId'));
    console.log(this.state.isLogin);
    console.log("==============");


    if (this.state.isLogin === true) {
      var url = '/profile';
      return <Redirect to={url} />
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="rows">
          <form method="GET" ref="myForm" action="" className="needs-validation" onSubmit={this.handleSubmit}>

            <div className="card">
          
              <div className="card-header">
                Login 
            </div>
              <div className="card-body">

                <div className="form-group">
                  <label>Email address</label>
                  <input type="text" name="email" onChange={this.updateHotel} className="form-control" placeholder="Enter your email id" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="text" name="pwd" onChange={this.updateHotel} className="form-control" placeholder="Enter youe password" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <p>{items.msg}</p>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}


export default LoginView;