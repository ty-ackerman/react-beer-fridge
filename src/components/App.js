import React from "react";
import SimpleSearch from "./SimpleSearch";
import DisplaySearchedAlc from "./DisplaySearchedAlc";
import DisplaySuggestion from "./DisplaySuggestion";

class App extends React.Component {
  state = {
    alcName: "",
    alcApiRes: {},
    suggestion: "",
    saved: {}
  };

  getAlcName = newAlc => {
    let currentAlc = this.state.alcName;
    currentAlc = newAlc;
    this.setState({
      alcName: currentAlc
    });
  };

  alcSearchRes = (newSearchRes, alcName) => {
    let currentSearch = { ...this.state.alcApiRes };
    if (alcName.length) {
      currentSearch = newSearchRes;
    } else {
      currentSearch = {};
    }
    this.setState({
      alcApiRes: currentSearch
    });
  };

  alcSearchSuggestion = newSuggestion => {
    let currentSuggestion = this.state.suggestion;
    currentSuggestion = newSuggestion;
    this.setState({
      suggestion: currentSuggestion
    });
  };

  clearSuggestion = () => {
    let currentSuggestion = this.state.suggestion;
    currentSuggestion = "";
    this.setState({
      suggestion: currentSuggestion
    });
  };

  saveAlc = (key, id) => {
    let currentSaved = { ...this.state.saved };
    currentSaved[key.id] = key[key.id];
    console.log(currentSaved);
  };

  render() {
    return (
      <div>
        <h2>Ty Ackerman</h2>
        <p>Let's goooooooo</p>
        <SimpleSearch
          getAlcName={this.getAlcName}
          alcSearchRes={this.alcSearchRes}
          alcApiRes={this.state.alcApiRes}
          alcSearchSuggestion={this.alcSearchSuggestion}
          clearSuggestion={this.clearSuggestion}
        />
        {this.state.alcApiRes.length ? (
          <DisplaySearchedAlc
            alcApiRes={this.state.alcApiRes}
            saveAlc={this.saveAlc}
          />
        ) : null}
        {this.state.suggestion.length ? (
          <DisplaySuggestion
            suggestion={this.state.suggestion}
            getAlcName={this.getAlcName}
            alcSearchRes={this.alcSearchRes}
            clearSuggestion={this.clearSuggestion}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
