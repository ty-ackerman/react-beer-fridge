import React from "react";

class ScrollPage extends React.Component {
  render() {
    return (
      <div>
        {this.props.searchData.is_first_page ? (
          <button disabled>Previous</button>
        ) : (
          <button onClick={() => console.log("hello")}>Previous</button>
        )}

        {this.props.searchData.is_final_page ? (
          <button disabled>Next</button>
        ) : (
          <button>Next</button>
        )}
      </div>
    );
  }
}

export default ScrollPage;
