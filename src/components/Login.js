import React from "react";
// import { getFunName } from "../helpers";
// import firebase from "firebase";
// import base, { firebaseApp } from "../base";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <h1>
          Bottles Of Beer
          <br />
          On The Wall
        </h1>
        <p className="description">
          Search Alcohol - Save Alcohol - Track Alcohol
          <br />
          <span className="tagline">It's that simple.</span>
          <br />
          The only app you need for managing your alochol inventory
        </p>
        <div className="buttonContainer">
          <button
            className="google"
            onClick={() => this.props.authenticate("Google")}
          >
            <span>
              <i class="fab fa-google" />
            </span>{" "}
            Log In with Google
          </button>
          <button
            className="facebook"
            onClick={() => this.props.authenticate("Facebook")}
          >
            <span>
              <i class="fab fa-facebook-f" />
            </span>{" "}
            Log In with Facebook
          </button>
          <button
            className="twitter"
            onClick={() => this.props.authenticate("Twitter")}
          >
            <span>
              <i class="fab fa-twitter" />
            </span>{" "}
            Log In with Twitter
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
