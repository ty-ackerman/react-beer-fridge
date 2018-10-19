import React from "react";

//This component will take the user's input in the search bar, and search the LCBO API

class SimpleSearch extends React.Component {
  alcInput = React.createRef();

  render() {
    return (
      <div className="simple-search">
        <form action="" onSubmit={e => this.props.apiSearch(e, this.alcInput)}>
          <input
            type="text"
            placeholder="Search Alcohol"
            required
            ref={this.alcInput}
          />
        </form>
      </div>
    );
  }
}

export default SimpleSearch;
