import React from "react";
import CheckoutOneAlc from "./CheckoutOneAlc";

class CheckoutMenu extends React.Component {
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
            />
          );
        })}
        <button>Put it on ice!</button>
      </div>
    );
  }
}

export default CheckoutMenu;
