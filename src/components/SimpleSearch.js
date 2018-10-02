import React from "react";
import axios from "axios";

//This component will take the user's input in the search bar, and search the LCBO API

class SimpleSearch extends React.Component {
  alcInput = React.createRef();

  render() {
    return (
      <div>
        <h2>Simple Search</h2>
        <form action="" onSubmit={e => this.props.apiSearch(e, this.alcInput)}>
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
