import React from "react";
import CheckoutOneAlc from "./CheckoutOneAlc";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BeerFridge from "./BeerFridge";

class CheckoutMenu extends React.Component {
  handleClick = () => {
    this.props.saveToFridge();
  };

  render() {
    return (
      <div>
        <h2>CheckoutMenu</h2>
        {Object.keys(this.props.checkout).map(key => {
          return (
            <CheckoutOneAlc
              key={key}
              checkout={this.props.checkout}
              index={key}
              increaseQuantCheckout={this.props.changeQuantCheckout}
              removeFromCheckout={this.props.removeFromCheckout}
            />
          );
        })}
        <button onClick={this.handleClick}>Put it on ice!</button>
      </div>
    );
  }
}

export default CheckoutMenu;
