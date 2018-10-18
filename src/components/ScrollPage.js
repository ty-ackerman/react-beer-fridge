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
          <button className="previous" disabled>
            <i class="fas fa-arrow-left" />
          </button>
        ) : (
          <button className="previous" onClick={this.handleClick}>
            <i class="fas fa-arrow-left" />
          </button>
        )}

        {this.props.searchData.is_final_page ? (
          <button className="next" disabled>
            <i class="fas fa-arrow-right" />
          </button>
        ) : (
          <button className="next" onClick={this.handleClick}>
            <i class="fas fa-arrow-right" />
          </button>
        )}
      </div>
    );
  }
}

export default ScrollPage;
