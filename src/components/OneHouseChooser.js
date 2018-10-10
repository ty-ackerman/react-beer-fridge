import React from "react";

class OneHouseChooser extends React.Component {
  render() {
    const houseName = Object.keys(this.props.oneHouse);
    return (
      <div>
        <h3>{houseName}</h3>
        <button onClick={() => this.props.getHouseId(houseName)}>Go!!!</button>
      </div>
    );
  }
}

export default OneHouseChooser;
