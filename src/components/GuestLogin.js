import React from "react";
import { getFunName } from "../helpers";

class GuestLogin extends React.Component {
  state = {
    incorrect: false
  };
  houseName = React.createRef();

  openFridge = e => {
    e.preventDefault();
    //   const houseName = this.userInput.current.value
    const houseName = this.houseName.value.value;
    if (this.props.nameAllowed(houseName)) {
      this.props.getHouseId(houseName);
      this.props.addOwnerToHouse(houseName);
      this.props.signInAnon();
    } else {
      this.setState({
        incorrect: true
      });
    }
  };
  render() {
    return (
      <div>
        <form action="" className="guest-house" onSubmit={this.openFridge}>
          <h2>Please Enter a House Name</h2>
          <input
            type="text"
            required
            ref={this.houseName}
            defaultValue={getFunName()}
          />
          {this.state.incorrect ? (
            <p>House name taken. Please select another.</p>
          ) : null}
          <button type="submit">Open Fridge</button>
        </form>
      </div>
    );
  }
}

export default GuestLogin;
