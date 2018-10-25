import React from "react";
import BeerFridgeOneAlc from "./BeerFridgeOneAlc";

class BeerFridge extends React.Component {
  render() {
    return (
      <div>
        <h2 className="current-inventory-title">Current Inventory</h2>
        <div className="fridge-alc-container">
          {Object.keys(this.props.fridge).map(key => {
            return (
              <BeerFridgeOneAlc
                key={key}
                fridge={this.props.fridge}
                index={key}
                drinkFridge={this.props.drinkFridge}
                removeFromFridge={this.props.removeFromFridge}
                removeFromCheckout={this.props.removeFromCheckout}
                saveCheckout={this.props.saveCheckout}
                showMoreInfo={this.props.showMoreInfo}
                changeShowMoreInfoState={this.props.changeShowMoreInfoState}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default BeerFridge;
