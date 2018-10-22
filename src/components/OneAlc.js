import React from "react";
import { formatPrice } from "../helpers";
import axios from "axios";

class OneAlc extends React.Component {
  state = {
    flag: null
  };

  handleClick = () => {
    const newSave = {};
    const id = this.props.index.id;
    newSave[id] = this.props.index;
    this.props.saveCheckout(newSave, id);
  };

  componentDidMount() {
    this.flagApiCall(this.props.index.origin);
  }

  flagApiCall(country) {
    console.log(country);
    let flag = null;
    axios({
      url: `https://restcountries.eu/rest/v2/name/${country}`
    }).then(res => {
      //This below will display all the data pretaining to country of the specific alcohol.
      //For now, all I am returning is the flag of the country in question
      flag = res.data["0"].flag;
      this.setState({
        flag
      });
    });
  }

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
        <img
          src={image_thumb_url ? image_thumb_url : "./assets/no-image.jpeg"}
          alt=""
        />
        <div className="one-alc-info">
          <p className="price">{formatPrice(price_in_cents)}</p>
          <p>{container}</p>
          <p className="origin">Origin - {origin}</p>
          <img
            className="flag"
            src={this.state.flag ? this.state.flag : null}
            alt=""
          />
          <button>{in_checkout ? <p>In Checkout</p> : <p />}</button>
          {in_checkout ? (
            <button
              className="in-checkout"
              onClick={() =>
                this.props.removeFromCheckout(id, this.props.index)
              }
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
