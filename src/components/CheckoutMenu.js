import React from "react";
import CheckoutOneAlc from "./CheckoutOneAlc";

class CheckoutMenu extends React.Component {
  handleClick = () => {
    this.props.saveToFridge();
  };

  render() {
    return (
      <div className="checkout">
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
        <button className="save-checkout" onClick={this.handleClick}>
          Save Alcohol
        </button>
      </div>
    );
  }
}

export default CheckoutMenu;
