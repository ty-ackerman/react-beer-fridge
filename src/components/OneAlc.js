import React from "react";
import { formatPrice } from "../helpers";

class OneAlc extends React.Component {
  handleClick = () => {
    const newSave = {};
    const id = this.props.index.id;
    newSave[id] = this.props.index;
    this.props.saveCheckout(newSave, id);
  };

  render() {
    const {
      name,
      origin,
      price_in_cents,
      id,
      in_checkout,
      image_thumb_url
    } = this.props.index;
    const container = this.props.index.package;
    return (
      <div className="one-alc">
        <h2>{name}</h2>
        <img src={image_thumb_url} alt="" />
        <div className="one-alc-info">
          <p>{origin}</p>
          <p>{container}</p>
          <p>{formatPrice(price_in_cents)}</p>
          <button>{in_checkout ? <p>In Checkout</p> : <p />}</button>
          {in_checkout ? (
            <button
              className="in-checkout"
              onClick={() => this.props.removeFromCheckout(id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button onClick={this.handleClick}>Add to Cart</button>
          )}
        </div>
      </div>
    );
  }
}

export default OneAlc;
