import React from "react";

class BeerFridgeOneAlc extends React.Component {
  handleDecrease = () => {
    this.props.drinkFridge(this.props.index);
  };

  handleRemove = () => {
    this.props.removeFromFridge(this.props.index);
  };

  handleMore = () => {
    const newSave = {};
    const id = this.props.index;
    newSave[id] = this.props.fridge[id];
    console.log(newSave);
    this.props.saveCheckout(newSave, id);
  };

  handleMoreInfo = () => {
    this.props.changeShowMoreInfoState(this.props.index);
  };

  render() {
    const {
      // alcohol_content,
      image_thumb_url,
      name,
      package_unit_type,
      // purchase_quantity,
      // total_package_units,
      // varietal,
      purchase_remaining,
      in_checkout
    } = this.props.fridge[this.props.index];
    return (
      <div>
        <h2>{name}</h2>
        <button onClick={this.handleRemove}>X</button>
        <p>{purchase_remaining}</p>
        <img src={image_thumb_url} alt={name} />
        {purchase_remaining !== 1 ? (
          package_unit_type === "box" ? (
            <p>
              {purchase_remaining} {package_unit_type + "es"} remaining
            </p>
          ) : (
            <p>
              {purchase_remaining} {package_unit_type + "s"} remaining
            </p>
          )
        ) : (
          <p>
            {purchase_remaining} {package_unit_type} remaining
          </p>
        )}
        {purchase_remaining > 0 ? (
          <button onClick={this.handleDecrease}>Drink Summm</button>
        ) : null}

        {!in_checkout ? (
          <button onClick={this.handleMore}>Order More</button>
        ) : (
          <p>In Checkout!!</p>
        )}
        <button onClick={this.handleMoreInfo}>More Info</button>
      </div>
    );
  }
}

export default BeerFridgeOneAlc;
