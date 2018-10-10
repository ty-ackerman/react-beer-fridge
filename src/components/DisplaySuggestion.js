import React from "react";
import axios from "axios";

class DisplaySuggestion extends React.Component {
  handleClick = e => {
    const alcName = this.props.suggestion;
    this.props.apiSearch(e, alcName);
  };

  render() {
    const alcName = this.props.suggestion;
    return (
      <div>
        <h2>Display Suggestion</h2>
        <p>
          Did you mean: <span onClick={this.handleClick}>{alcName}</span>
        </p>
        <p>No results containing your search terms were found.</p>
      </div>
    );
  }
}

export default DisplaySuggestion;
