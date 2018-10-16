import React from "react";

class BackButton extends React.Component {
  render() {
    return (
      <div>
        <button
          className="backButton defaultButton"
          onClick={this.props.backToHouseChooser}
        >
          Change Houses
        </button>
      </div>
    );
  }
}

export default BackButton;
