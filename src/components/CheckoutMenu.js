import React from "react";
import CheckoutOneAlc from "./CheckoutOneAlc";

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
