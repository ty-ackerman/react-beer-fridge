import React from "react";

class OneHouseChooser extends React.Component {
  render() {
    const houseName = Object.keys(this.props.oneHouse);
    return (
      <div
        className="one-house"
        onClick={() => this.props.getHouseId(houseName)}
      >
        <h3>{houseName}</h3>
      </div>
    );
  }
}

export default OneHouseChooser;
