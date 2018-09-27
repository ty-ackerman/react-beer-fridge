import React from "react";
import OneAlc from "./OneAlc";

//This component will display the alcohol searched in SimpleSearch

class DisplaySearchedAlc extends React.Component {
  render() {
    return (
      <div>
        <h2>DisplaySearchedAlc</h2>
        <p>Displaying {this.props.alcApiRes.length} results: </p>
        <ul>
          {this.props.alcApiRes.map(key => {
            return (
              <OneAlc
                key={key.id}
                index={key}
                saveCheckout={this.props.saveCheckout}
                checkout={this.props.checkout}
                objectHasContent={this.props.objectHasContent}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DisplaySearchedAlc;
