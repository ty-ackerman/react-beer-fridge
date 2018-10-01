import React from "react";
import axios from "axios";

//This component will take the user's input in the search bar, and search the LCBO API

class SimpleSearch extends React.Component {
  alcInput = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    const alcName = this.alcInput.value.value;
    this.props.getAlcName(alcName);
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: alcName,
        page: this.props.currentPage
      }
    }).then(res => {
      console.log(res.data.pager);
      if (res.data.result) {
        this.props.alcSearchRes(res.data.result, alcName);
      }
      if (res.data.suggestion) {
        this.props.alcSearchSuggestion(res.data.suggestion);
      } else {
        this.props.clearSuggestion();
      }
      this.props.alcSearchData(res.data.pager);
    });
  };

  render() {
    return (
      <div>
        <h2>Simple Search</h2>
        <form action="" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search Alcohol"
            required
            ref={this.alcInput}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SimpleSearch;
