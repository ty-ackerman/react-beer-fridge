import React from "react";

class ChangeDisplay extends React.Component {
  render() {
    return (
      <div>
        <button
          className="defaultButton changeDisplayButton"
          onClick={this.props.showFridge}
        >
          {this.props.displayFridge
            ? "Search for Alcohol"
            : "See Saved Alcohol"}
        </button>
      </div>
    );
  }
}

export default ChangeDisplay;
