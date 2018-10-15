import React from "react";

class OneHouseChooser extends React.Component {
  state = {
    images: [],
    loading: true
  };

  getImages = () => {
    const houseName = Object.keys(this.props.oneHouse);
    const fridge = this.props.oneHouse[houseName].fridge;
    const images = this.state.images;
    if (fridge) {
      Object.keys(fridge).map(stats => {
        if (images.length < 5) {
          images.push(fridge[stats].image_thumb_url);
        }
        return null;
      });
    }
    this.setState({
      images
    });
  };
  componentDidMount() {
    this.getImages();
  }

  render() {
    const houseName = Object.keys(this.props.oneHouse);
    const { images, loading } = this.state;
    return (
      <div className="one-house">
        <h3>{houseName}</h3>
        <div className="preview-image-container">
          {images.map(image => {
            return (
              <div className="preview-image">
                <img src={image} alt="" />
              </div>
            );
          })}
        </div>
        <p className="select" onClick={() => this.props.getHouseId(houseName)}>
          Select
        </p>
      </div>
    );
  }
}

export default OneHouseChooser;
