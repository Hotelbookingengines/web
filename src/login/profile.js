import React from 'react';
import { Redirect } from "react-router-dom";
import cookie from 'react-cookies';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      items: [],
      hotelifo: []

    };
    this.updateHotel = this.updateHotel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
       console.log("not redirection of url" + cookie.load('userId'));

      fetch("http://localhost/api/profile/profile.php?e=hotel4385@gmail.com")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });

          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
     
   
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
            items: result
          });

        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
    event.preventDefault();

  }

  render() {
    const { error, isLoaded, items } = this.state;

    console.log("======check========");
    console.log(cookie.load('userId'));

    

 

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
                User primary details
            </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Email address</label>
                  <input type="text" name="email" value={items.emailid} onChange={this.updateHotel} className="form-control" placeholder="Enter your email id" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="pwd" value={items.pwd} onChange={this.updateHotel} className="form-control" placeholder="Enter youe password" />
                </div>

                <div className="form-group">
                  <label>city</label>
                  <input type="text" name="city" value={items.city} onChange={this.updateHotel} className="form-control" placeholder="Enter youe password" />
                </div>
                <div className="form-group">
                  <label>country</label>
                  <input type="text" name="country" value={items.country} onChange={this.updateHotel} className="form-control" placeholder="Enter youe password" />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={items.pincode} onChange={this.updateHotel} className="form-control" placeholder="Enter youe password" />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
                <p>{items.msg}</p>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}


export default ProfileView;