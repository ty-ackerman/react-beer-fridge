import React from "react";
import { formatPrice } from "../helpers";

class CheckoutOneAlc extends React.Component {
  handleAmountChange = e => {
    const sign = e.target.textContent;
    const index = this.props.index;
    let quant = this.props.checkout[index].purchase_quantity;
    if (sign === "+") {
      quant++;
      this.props.updateCheckoutTotal(
        sign,
        parseInt(this.props.checkout[this.props.index].price_in_cents)
      );
    } else {
      quant--;
      this.props.updateCheckoutTotal(
        sign,
        parseInt(this.props.checkout[this.props.index].price_in_cents)
      );
    }
    this.props.increaseQuantCheckout(index, quant);
  };

  handleRemove = () => {
    const index = this.props.index;
    this.props.removeFromCheckout(index, this.props.checkout[this.props.index]);
  };

  render() {
    const {
      price_in_cents,
      purchase_quantity,
      name,
      image_thumb_url
    } = this.props.checkout[this.props.index];
    return (
      <div className="one-alc-checkout clearfix">
        <div className="image-container">
          <img
            src={image_thumb_url ? image_thumb_url : "./assets/no-image.jpeg"}
            alt=""
          />
        </div>
        <div className="text-container">
          <p className="alcName">{name}</p>
          <p>{formatPrice(price_in_cents * purchase_quantity)}</p>
          <div className="purchase-quant">
            {purchase_quantity === 1 ? (
              <button
                className="subtract"
                disabled
                ref={this.subtract}
                onClick={this.handleAmountChange}
              >
                -
              </button>
            ) : (
              <button
                className="subtract"
                ref={this.subtract}
                onClick={this.handleAmountChange}
              >
                -
              </button>
            )}
            <p>{purchase_quantity}</p>
            <button
              className="add"
              ref={this.addition}
              onClick={this.handleAmountChange}
            >
              +
            </button>
          </div>
        </div>
        <button className="remove" onClick={this.handleRemove}>
          &times;
        </button>
      </div>
    );
  }
}

export default CheckoutOneAlc;
