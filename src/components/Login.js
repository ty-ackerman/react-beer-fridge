import React from "react";
import { getFunName } from "../helpers";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Login extends React.Component {
  state = {
    uid: null,
    user: null
  };

  openHouse = () => {
    //   const houseName = this.userInput.current.value
    // this.setState({

    // })
    //Change the page to house/whatever-they-entered
    this.props.history.push({
      pathname: `/house/`,
      state: {
        uid: this.state.uid,
        user: JSON.parse(JSON.stringify(this.state.user))
      }
      //the state will be passed through this.props.history.location.state
    });
  };

  authHandler = async authData => {
    console.log(authData.user);
    this.setState({
      uid: authData.user.uid,
      user: authData.user
    });
    // const house = await base.fetch(this.props.houseId, { context: this });
    this.openHouse();
    //   // console.log(house);
    //   //THE CODE BELOW WILL BE REALLY IMPORTANT FOR THE BEER-FRIDGE APP
    //   const dbRef = firebase.database().ref();
    //   // console.log(dbRef);
    //   dbRef.on("value", data => {
    //     // console.log(Object.keys(data.val()));
    //     let house = data.val();
    //     console.log(house);
    //     Object.keys(house).map(index => {
    //       if (house[index].owner) {
    //         console.log(house[index]);
    //       }
    //     });
    //   });
    //   // if (!house.owner) {
    //   //   await base.post(`${this.props.houseId}/owner`, {
    //   //     data: authData.user.uid
    //   //   });
    //   //   this.openHouse();
    //   // }
    //   // this.setState({
    //   //   uid: authData.user.uid,
    //   //   owner: house.owner || authData.user.uid
    //   // });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    return (
      <section className="login">
        <h2>Inventory Login</h2>
        <p>Sign in to manage your beer inventory</p>
        <button className="github" onClick={() => this.authenticate("Google")}>
          Log In With Google
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate("Facebook")}
        >
          Log In With Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate("Twitter")}
        >
          Log In With Twitter
        </button>
      </section>
    );
  }
}

export default Login;
