import React from "react";
import { getFunName } from "../helpers";
import firebase from "firebase";
import base, { firebaseApp } from "../base";
import Logout from "./Logout";

//This component will be the second page after the user logs in
class HouseChooser extends React.Component {
  userInput = React.createRef();

  openFridge = e => {
    e.preventDefault();
    //   const houseName = this.userInput.current.value
    const houseName = this.userInput.value.value;
    this.props.getHouseId(houseName);
    // console.log(houseName);
    // base.post(`${houseName}/owner`, {
    //   data: this.state.uid
    // });
    //Change the page to house/whatever-they-entered
    // this.props.history.push({
    //   pathname: `/house/${houseName}`,
    //   state: { message: "hello" }
    // });
  };

  //     console.log(authData.user.uid);
  // const house = await base.fetch(this.props.houseId, { context: this });
  // console.log(house);
  //THE CODE BELOW WILL BE REALLY IMPORTANT FOR THE BEER-FRIDGE APP

  // console.log(dbRef);
  // console.log(Object.keys(data.val()));
  // if (!house.owner) {
  //   await base.post(`${this.props.houseId}/owner`, {
  //     data: authData.user.uid
  //   });
  //   this.openFridge();
  // }
  // this.setState({
  //   uid: authData.user.uid,
  //   owner: house.owner || authData.user.uid
  // });
  //   };

  componentDidMount() {
    // this.authHandler();
    () => this.props.findHousesOwned();
  }

  // logMeOut = async () => {
  //   await firebase.auth().signOut();
  //   this.setState({
  //     uid: null
  //   });
  //   this.props.history.push({
  //     pathname: `/`,
  //     state: { uid: null }
  //   });
  // };

  render() {
    return (
      <React.Fragment>
        <Logout logMeOut={this.props.logMeOut} />
        <form action="" className="house-selector" onSubmit={this.openFridge}>
          <h2>
            {this.props.user
              ? this.props.user.displayName
              : "Please Enter a House Name"}
          </h2>
          <input
            type="text"
            required
            ref={this.userInput}
            placeholder="House Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Open Fridge</button>
        </form>
      </React.Fragment>
    );
  }
}

export default HouseChooser;
