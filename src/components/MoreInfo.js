import React from "react";

class MoreInfo extends React.Component {
  alcoholPercent = number => {
    const num = number.toString();
    let numLength = num.length;
    let newNum = "";
    for (let i in num) {
      if (numLength === 1) {
        null;
      } else if (numLength !== 2) {
        newNum += num[i];
      } else {
        newNum += `.${num[i]}`;
      }
      numLength--;
    }

    return `${newNum}%`;
  };

  render() {
    const {
      name,
      alcohol_content,
      image_url,
      origin,
      primary_category,
      producer_name,
      serving_suggestion,
      style,
      tasting_note,
      varietal
    } = this.props.fridge[this.props.showMoreInfoId];
    const alc_package = this.props.fridge[this.props.showMoreInfoId].package;
    return (
      <div className="more-info-container">
        <div className="more-info-content">
          <button
            className="close-more-info"
            onClick={() =>
              this.props.changeShowMoreInfoState(this.props.showMoreInfoId)
            }
          >
            Close
          </button>
          <h2 className="alc-title">{name}</h2>
          <p className="alc-subtitle">{producer_name}</p>
          <div className="wrapper">
            <div className="more-info-content-left">
              <div className="alc-image-container">
                <img
                  src={image_url ? image_url : "./assets/no-image.jpeg"}
                  alt=""
                />
              </div>
            </div>
            <div className="more-info-content-right">
              <p>
                Primary Category: <span>{primary_category}</span>
              </p>
              <p className="origin">
                Origin: <span>{origin}</span>
              </p>
              {alcohol_content ? (
                <p className="alcohol_content">
                  Alcohol Content:{" "}
                  <span>{this.alcoholPercent(alcohol_content)}</span>
                </p>
              ) : null}
              {varietal ? (
                <p className="varietal">
                  Varietal: <span>{varietal}</span>
                </p>
              ) : null}
              {style ? (
                <p className="style">
                  Style: <span>{style}</span>
                </p>
              ) : null}
              {tasting_note ? (
                <p className="tasting_note">
                  Tasting Note: <span>{tasting_note}</span>
                </p>
              ) : null}
              {serving_suggestion ? (
                <p className="serving_suggestion">
                  Serving Suggestion: <span>{serving_suggestion}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoreInfo;
