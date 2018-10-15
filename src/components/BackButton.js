import React from "react";

class BackButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.backToHouseChooser}>Back</button>
      </div>
    );
  }
}

export default BackButton;
