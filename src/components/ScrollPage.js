import React from "react";

class ScrollPage extends React.Component {
  handleClick = e => {
    const instructions = e.target.textContent;
    this.props.pageChanger(instructions);
  };

  render() {
    return (
      <div>
        {this.props.searchData.is_first_page ? (
          <button disabled>Previous</button>
        ) : (
          <button onClick={this.handleClick}>Previous</button>
        )}

        {this.props.searchData.is_final_page ? (
          <button disabled>Next</button>
        ) : (
          <button onClick={this.handleClick}>Next</button>
        )}
      </div>
    );
  }
}

export default ScrollPage;
