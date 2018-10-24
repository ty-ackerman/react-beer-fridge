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
      <div className="fridge-one-alc-container">
        <h2>{name}</h2>
        <button className="remove" onClick={this.handleRemove}>
          &times;
        </button>
        <div className="alc-image-container">
          <img
            src={image_thumb_url ? image_thumb_url : "./assets/no-image.jpeg"}
            alt={name}
          />
        </div>
        <div className="info-container">
          {purchase_remaining > 0 ? (
            <button className="less" onClick={this.handleDecrease}>
              -
            </button>
          ) : (
            <button
              className="less"
              disabled="disabled"
              onClick={this.handleDecrease}
            >
              -
            </button>
          )}
          {purchase_remaining !== 1 ? (
            package_unit_type === "box" ? (
              <p className="remaining">
                {purchase_remaining} {package_unit_type + "es"}
              </p>
            ) : (
              <p className="remaining">
                {purchase_remaining} {package_unit_type + "s"}
              </p>
            )
          ) : (
            <p className="remaining">
              {purchase_remaining} {package_unit_type}
            </p>
          )}

          {!in_checkout ? (
            <button className="more" onClick={this.handleMore}>
              +
            </button>
          ) : (
            <button
              className="undo"
              onClick={() =>
                this.props.removeFromCheckout(
                  this.props.index,
                  this.props.fridge[this.props.index]
                )
              }
            >
              Undo
            </button>
          )}
        </div>
        <button className="more-info" onClick={this.handleMoreInfo}>
          More Info
        </button>
      </div>
    );
  }
}

export default BeerFridgeOneAlc;
