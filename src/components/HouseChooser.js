import React from "react";
import { getFunName } from "../helpers";
// import firebase from "firebase";
// import base, { firebaseApp } from "../base";
import Logout from "./Logout";
import MDSpinner from "react-md-spinner";
import OneHouseChooser from "./OneHouseChooser";

//This component will be the second page after the user logs in
class HouseChooser extends React.Component {
  state = {
    incorrect: false
  };

  userInput = React.createRef();

  openFridge = e => {
    e.preventDefault();
    //   const houseName = this.userInput.current.value
    const houseName = this.userInput.value.value;
    console.log(this.props.nameAllowed(houseName));
    if (this.props.nameAllowed(houseName)) {
      this.props.getHouseId(houseName);
      this.props.addOwnerToHouse(houseName);
    } else {
      this.setState({
        incorrect: true
      });
    }
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
    this.props.findHousesOwned();

    // this.authHandler();
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
    const houseNames = this.props.ownedByUser;
    if (this.props.pageLoading) {
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
            {this.state.incorrect ? (
              <p>House name taken. Please select another.</p>
            ) : null}
          </form>
          <MDSpinner className="spinner" size={100} />
        </React.Fragment>
      );
    }

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
        {this.state.incorrect ? (
          <p>House name taken. Please select another.</p>
        ) : null}
        {houseNames.length ? (
          houseNames.map(house => {
            return (
              <OneHouseChooser
                oneHouse={house}
                key={Object.keys(house)}
                getHouseId={this.props.getHouseId}
              />
            );
          })
        ) : (
          <p>No Houses Saved</p>
        )}
      </React.Fragment>
    );
  }
}

export default HouseChooser;
