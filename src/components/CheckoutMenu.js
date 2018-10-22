import React from "react";
import CheckoutOneAlc from "./CheckoutOneAlc";
import { formatPrice } from "../helpers";

class CheckoutMenu extends React.Component {
  handleClick = () => {
    this.props.saveToFridge();
  };

  render() {
    return (
      <div className="checkout">
        <h1>Shopping Cart</h1>
        {Object.keys(this.props.checkout).map(key => {
          return (
            <CheckoutOneAlc
              key={key}
              checkout={this.props.checkout}
              index={key}
              increaseQuantCheckout={this.props.changeQuantCheckout}
              removeFromCheckout={this.props.removeFromCheckout}
              updateCheckoutTotal={this.props.updateCheckoutTotal}
            />
          );
        })}
        <div className="total-container">
          <p>
            Total: <span>{formatPrice(this.props.checkoutTotal)}</span>
          </p>
        </div>
        <button className="save-checkout" onClick={this.handleClick}>
          Save Alcohol
        </button>
      </div>
    );
  }
}

export default CheckoutMenu;
