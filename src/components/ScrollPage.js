import React from "react";

class ScrollPage extends React.Component {
  handleNext = () => {
    const instructions = "Next";
    this.props.pageChanger(instructions);
  };

  handleLast = () => {
    const instructions = "Last";
    this.props.pageChanger(instructions);
  };

  render() {
    return (
      <div className="scroll-container">
        {this.props.searchData.is_first_page ? (
          <button className="previous" disabled>
            <i class="fas fa-arrow-left" />
          </button>
        ) : (
          <button className="previous" onClick={this.handleLast}>
            <i class="fas fa-arrow-left" />
          </button>
        )}
        <p className="total-pages">
          Page {this.props.currentPage} of {this.props.searchData.total_pages}
        </p>
        {this.props.searchData.is_final_page ? (
          <button className="next" disabled>
            <i class="fas fa-arrow-right" />
          </button>
        ) : (
          <button className="next" onClick={this.handleNext}>
            <i class="fas fa-arrow-right" />
          </button>
        )}
      </div>
    );
  }
}

export default ScrollPage;
