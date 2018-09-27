import React from "react";
import { getFunName } from "../helpers";

class Login extends React.Component {
  userInput = React.createRef();

  openFridge = e => {
    e.preventDefault();
    //   const houseName = this.userInput.current.value
    const houseName = this.userInput.value.value;
    //Change the page to house/whatever-they-entered
    this.props.history.push(`/house/${houseName}`);
  };

  render() {
    return (
      <form action="" className="house-selector" onSubmit={this.openFridge}>
        <h2>Please Enter A House Name</h2>
        <input
          type="text"
          required
          ref={this.userInput}
          placeholder="House Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Open Fridge</button>
      </form>
    );
  }
}

export default Login;
