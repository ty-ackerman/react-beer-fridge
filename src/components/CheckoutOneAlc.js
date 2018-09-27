import React from "react";
import { formatPrice } from "../helpers";

class CheckoutOneAlc extends React.Component {
  handleAmountChange = e => {
    const sign = e.target.textContent;
    const index = this.props.index;
    let quant = this.props.checkout[index].purchase_quantity;
    if (sign === "+") {
      quant++;
    } else {
      quant--;
    }
    this.props.increaseQuantCheckout(index, quant);
  };

  render() {
    const { price_in_cents, purchase_quantity, name } = this.props.checkout[
      this.props.index
    ];
    return (
      <div>
        <p>{name}</p>
        <p>{formatPrice(price_in_cents)}</p>
        <div>
          {purchase_quantity === 1 ? (
            <button
              disabled
              ref={this.subtract}
              onClick={this.handleAmountChange}
            >
              -
            </button>
          ) : (
            <button ref={this.subtract} onClick={this.handleAmountChange}>
              -
            </button>
          )}
          {purchase_quantity}
          <button ref={this.addition} onClick={this.handleAmountChange}>
            +
          </button>
        </div>
        <button>Remove</button>
      </div>
    );
  }
}

export default CheckoutOneAlc;
