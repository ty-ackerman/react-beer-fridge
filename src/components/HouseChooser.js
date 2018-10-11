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
  };

  componentDidMount() {
    this.props.findHousesOwned();
  }

  render() {
    const houseNames = this.props.ownedByUser;
    if (this.props.pageLoading) {
      return (
        <div className="house-chooser container">
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
              defaultValue={getFunName()}
            />
            <button type="submit">Open Fridge</button>
            {this.state.incorrect ? (
              <p>House name taken. Please select another.</p>
            ) : null}
          </form>
          <div className="spinner-container">
            <MDSpinner
              className="spinner"
              size={250}
              borderSize={30}
              color2="#4de2e0"
              color1="#ff5151"
              color4="#4de2e0"
              color3="#ff5151"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="house-chooser container">
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
      </div>
    );
  }
}

export default HouseChooser;
