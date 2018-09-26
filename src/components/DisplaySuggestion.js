import React from "react";
import axios from "axios";

class DisplaySuggestion extends React.Component {
  handleClick = () => {
    //perform another axios get request
    const alcName = this.props.suggestion;
    this.props.getAlcName(alcName);
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: alcName
      }
    }).then(res => {
      this.props.alcSearchRes(res.data.result, alcName);
      this.props.clearSuggestion();
    });
  };

  render() {
    return (
      <div>
        <h2>Display Suggestion</h2>
        <p>
          Did you mean:{" "}
          <span onClick={this.handleClick}>{this.props.suggestion}</span>
        </p>
        <p>No results containing your search terms were found.</p>
      </div>
    );
  }
}

export default DisplaySuggestion;
