import React from "react";
import { formatPrice } from "../helpers";

class OneAlc extends React.Component {
  handleClick = () => {
    const newSave = {};
    const id = this.props.index.id;
    newSave[id] = this.props.index;
    console.log(newSave);
    this.props.saveAlc(newSave, id);
  };

  render() {
    const { name, origin, image_thumb_url, price_in_cents } = this.props.index;
    return (
      <div>
        <h2>{name}</h2>
        <img src={image_thumb_url} alt="" />
        <p>{origin}</p>
        <p>{formatPrice(price_in_cents)}</p>
        <button onClick={this.handleClick}>Save this booze!!</button>
      </div>
    );
  }
}

export default OneAlc;
