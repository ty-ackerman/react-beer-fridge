import React from "react";

//This component will display the alcohol searched in SimpleSearch

class DisplaySearchedAlc extends React.Component {
  componentDidMount() {
    console.log("lets load these flags!!");
  }

  render() {
    return (
      <div>
        <h2>DisplaySearchedAlc</h2>
        <p>Displaying {this.props.alcApiRes.length} results: </p>
        <ul>
          {this.props.alcApiRes.map(key => {
            return (
              <React.Fragment key={`${key.id}`}>
                <li key={`name-${key.id}`}>{key.name}</li>
                <img
                  key={`img-${key.id}`}
                  src={key["image_thumb_url"]}
                  alt={key}
                />
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DisplaySearchedAlc;
