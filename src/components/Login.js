import React from "react";
// import { getFunName } from "../helpers";
// import firebase from "firebase";
// import base, { firebaseApp } from "../base";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your beer inventory</p>
        <div className="buttonContainer">
          <button
            className="google"
            onClick={() => this.props.authenticate("Google")}
          >
            Sign In With Google
          </button>
          <button
            className="facebook"
            onClick={() => this.props.authenticate("Facebook")}
          >
            Sign In With Facebook
          </button>
          <button
            className="twitter"
            onClick={() => this.props.authenticate("Twitter")}
          >
            Sign In With Twitter
          </button>
        </div>
        {/* <button className="guest" onClick={() => this.props.loginAsGuest()}>
          Log In As Guest
        </button> */}
      </div>
    );
  }
}

export default Login;
