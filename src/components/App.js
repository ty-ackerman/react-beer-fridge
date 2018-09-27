import React from "react";
import SimpleSearch from "./SimpleSearch";
import DisplaySearchedAlc from "./DisplaySearchedAlc";
import DisplaySuggestion from "./DisplaySuggestion";
import CheckoutMenu from "./CheckoutMenu";
import BeerFridge from "./BeerFridge";
import base from "../base";

class App extends React.Component {
  state = {
    alcName: "",
    alcApiRes: {},
    suggestion: "",
    checkout: {},
    fridge: {}
  };

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.houseId,
      JSON.stringify(this.state.checkout)
    );
  }

  componentDidMount() {
    //Local Storage
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.houseId);
    if (localStorageRef) {
      this.setState({
        checkout: JSON.parse(localStorageRef)
      });
    }
    console.log(this.state.checkout);

    //Firebase
    this.ref = base.syncState(`${params.houseId}/fridge`, {
      context: this,
      state: "fridge"
    });
  }

  componentWillUnmount() {
    //Prevent firebase memory leak
    base.removeBinding(this.ref);
  }

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
      currentSearch.map(key => {
        key["in_checkout"] = false;
        Object.keys(this.state.checkout).map(checkoutKey => {
          if (checkoutKey == key.id) {
            key["in_checkout"] = true;
          }
        });
      });
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

  saveCheckout = (key, id) => {
    let currentCheckout = { ...this.state.checkout };
    currentCheckout[id] = key[id];
    currentCheckout[id]["purchase_quantity"] = 1;
    currentCheckout[id]["in_checkout"] = true;
    // currentSearch[id]["in_checkout"] = true;
    this.setState({
      checkout: currentCheckout
      // alcApiRes: currentSearch
    });
  };

  objectHasContent = obj => {
    let content = false;
    for (let i in obj) {
      if (obj[i]) {
        content = true;
      }
    }
    return content;
  };

  changeQuantCheckout = (key, newAmount) => {
    let currentState = { ...this.state.checkout };
    currentState[key].purchase_quantity = newAmount;
    this.setState({
      checkout: currentState
    });
  };

  removeFromCheckout = key => {
    let checkoutCurrentState = { ...this.state.checkout };
    let searchCurrentStateObj = this.state.alcApiRes;
    let searchCurrentState = { ...searchCurrentStateObj };
    delete checkoutCurrentState[key];
    Object.keys(searchCurrentState).map(index => {
      if (searchCurrentState[index].id == key) {
        searchCurrentState[index]["in_checkout"] = false;
      }
    });
    this.setState({
      checkout: checkoutCurrentState,
      alcApiRes: searchCurrentStateObj
    });
  };

  saveToFridge = () => {
    const checkout = { ...this.state.checkout };
    let fridge = checkout;
    this.setState({
      fridge: fridge
    });
    console.log(this.state.fridge);
  };

  render() {
    return (
      <div>
        <h1>Beer Fridge</h1>
        {this.objectHasContent(this.state.fridge) ? (
          <BeerFridge fridge={this.state.fridge} />
        ) : null}
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
            saveCheckout={this.saveCheckout}
            checkout={this.state.checkout}
            objectHasContent={this.objectHasContent}
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
        {this.objectHasContent(this.state.checkout) ? (
          <CheckoutMenu
            checkout={this.state.checkout}
            changeQuantCheckout={this.changeQuantCheckout}
            removeFromCheckout={this.removeFromCheckout}
            saveToFridge={this.saveToFridge}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
