import React from "react";
import BeerFridgeOneAlc from "./BeerFridgeOneAlc";

class BeerFridge extends React.Component {
  render() {
    return (
      <div>
        <h2>Current Inventory</h2>
        {Object.keys(this.props.fridge).map(key => {
          return (
            <BeerFridgeOneAlc
              key={key}
              fridge={this.props.fridge}
              index={key}
              drinkFridge={this.props.drinkFridge}
              removeFromFridge={this.props.removeFromFridge}
              saveCheckout={this.props.saveCheckout}
            />
          );
        })}
      </div>
    );
  }
}

export default BeerFridge;
