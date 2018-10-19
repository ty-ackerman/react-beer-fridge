import React from "react";
import OneAlc from "./OneAlc";
import ScrollPage from "./ScrollPage";
import MDSpinner from "react-md-spinner";

//This component will display the alcohol searched in SimpleSearch

class DisplaySearchedAlc extends React.Component {
  render() {
    if (this.props.pageLoading) {
      return (
        <React.Fragment>
          <p className="results-found">
            {this.props.searchData.total_record_count}{" "}
            {this.props.searchData.total_record_count === 1
              ? "result"
              : "total results"}{" "}
            found.
          </p>
          <ScrollPage
            searchData={this.props.searchData}
            currentPage={this.props.currentPage}
            pageChanger={this.props.pageChanger}
          />
          <MDSpinner className="spinner" size={100} />
        </React.Fragment>
      );
    }
    const pageStart = (this.props.currentPage - 1) * 20 + 1;
    const pageEnd =
      pageStart + this.props.searchData.current_page_record_count - 1;
    return (
      <div className="wrapper">
        <p className="results-found">
          {this.props.searchData.total_record_count}{" "}
          {this.props.searchData.total_record_count === 1
            ? "result"
            : "total results"}{" "}
          found.
        </p>
        <ScrollPage
          searchData={this.props.searchData}
          currentPage={this.props.currentPage}
          pageChanger={this.props.pageChanger}
        />
        <ul className="searched-item-container">
          {this.props.alcApiRes.map(key => {
            return (
              <OneAlc
                key={key.id}
                index={key}
                saveCheckout={this.props.saveCheckout}
                checkout={this.props.checkout}
                objectHasContent={this.props.objectHasContent}
                removeFromCheckout={this.props.removeFromCheckout}
                // flagApiCall={this.props.flagApiCall}
              />
            );
          })}
        </ul>
        <ScrollPage
          searchData={this.props.searchData}
          currentPage={this.props.currentPage}
          pageChanger={this.props.pageChanger}
        />
      </div>
    );
  }
}

export default DisplaySearchedAlc;
