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
    const { name, origin, price_in_cents, id, in_checkout } = this.props.index;
    const container = this.props.index.package;
    return (
      <div>
        <h2>{name}</h2>
        {/* <img src={image_thumb_url} alt="" /> */}
        <p>{origin}</p>
        <p>{container}</p>
        <p>{formatPrice(price_in_cents)}</p>
        {in_checkout ? (
          <p>In Checkout!!</p>
        ) : (
          <button onClick={this.handleClick}>Save this booze!!</button>
        )}
        {/* <button onClick={this.handleClick}>
          {this.props.checkout[id].in_checkout}
        </button> */}
        {/* {this.props.objectHasContent(this.props.checkout) ? (
          Object.keys(this.props.checkout).map(checkoutId => {
            console.log(Object.keys(this.props.checkout));
            if (!(checkoutId == id)) {
              return (
                <button onClick={this.handleClick}>Save this booze!!</button>
              );
            }
          })
        ) : (
          <button onClick={this.handleClick}>Save this booze!!</button>
        )} */}
        {/* {this.props.objectHasContent(this.props.checkout) ? (
          this.props.checkout[this.props.index.id].in_checkout ? (
            <p>In Checkout!</p>
          ) : (
            <button onClick={this.handleClick}>Save this booze!!</button>
          )
        ) : (
          <button onClick={this.handleClick}>Save this booze!!</button>
        )} */}
      </div>
    );
  }
}

export default OneAlc;
