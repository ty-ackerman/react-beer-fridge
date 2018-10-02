import React from "react";
import axios from "axios";
import SimpleSearch from "./SimpleSearch";
import DisplaySearchedAlc from "./DisplaySearchedAlc";
import DisplaySuggestion from "./DisplaySuggestion";
import CheckoutMenu from "./CheckoutMenu";
import BeerFridge from "./BeerFridge";
import base, { firebaseApp } from "../base";
import firebase from "firebase";

class App extends React.Component {
  state = {
    alcName: "",
    alcApiRes: {},
    suggestion: "",
    checkout: {},
    fridge: {},
    currentPage: 1,
    searchData: {},
    pageLoading: false
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

  apiSearch = (e, alcInput) => {
    e.preventDefault();
    let pageLoading = this.state.pageLoading;
    pageLoading = true;
    this.setState({
      pageLoading
    });
    const alcName = alcInput.value.value;
    this.getAlcName(alcName);
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: alcName,
        page: this.state.currentPage
      }
    }).then(res => {
      if (res.data.result) {
        this.alcSearchRes(res.data.result, alcName);
      }
      if (res.data.suggestion) {
        this.alcSearchSuggestion(res.data.suggestion);
      } else {
        this.clearSuggestion();
      }
      this.alcSearchData(res.data.pager);
      pageLoading = false;
      this.setState({
        pageLoading
      });
    });
  };

  apiChangePage = () => {
    const { alcName, currentPage } = this.state;
    let pageLoading = this.state.pageLoading;
    pageLoading = true;
    this.setState({
      pageLoading
    });
    axios({
      url: "https://lcboapi.com/products",
      params: {
        access_key:
          "MDoxNDEyMWE4Ni01ZGZiLTExZTgtYTVjYi1jN2JlMmFhMTZiNmQ6SzlralhKWGRwNWVXclp0R1VhcEJFNUU3WWRaTFVLTWkxRW5l",
        q: alcName,
        page: currentPage
      }
    }).then(res => {
      this.alcSearchRes(res.data.result, alcName);
      this.alcSearchData(res.data.pager);
      pageLoading = false;
      this.setState({
        pageLoading
      });
    });
  };

  alcSearchData = dataRes => {
    let searchData = { ...this.state.searchData };
    searchData = dataRes;
    this.setState({
      searchData
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
    let fridge = { ...this.state.fridge };
    currentCheckout[id] = key[id];
    currentCheckout[id]["purchase_quantity"] = 1;
    currentCheckout[id]["in_checkout"] = true;
    if (currentCheckout[id].package_unit_type === "bagnbox") {
      currentCheckout[id].package_unit_type = "box";
    }
    Object.keys(fridge).map(index => {
      if (fridge[index].id == currentCheckout[id].id) {
        fridge[index].in_checkout = true;
      }
    });
    this.setState({
      checkout: currentCheckout,
      fridge
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
    currentState[key]["purchase_remaining"] =
      newAmount * currentState[key]["total_package_units"];
    this.setState({
      checkout: currentState
    });
  };

  removeFromCheckout = key => {
    let checkoutCurrentState = { ...this.state.checkout };
    let searchCurrentStateObj = this.state.alcApiRes;
    let searchCurrentState = { ...searchCurrentStateObj };
    let fridge = { ...this.state.fridge };
    delete checkoutCurrentState[key];
    Object.keys(searchCurrentState).map(index => {
      if (searchCurrentState[index].id == key) {
        searchCurrentState[index]["in_checkout"] = false;
      }
    });
    Object.keys(fridge).map(id => {
      if (fridge[id].id == key) {
        fridge[id].in_checkout = false;
      }
    });
    this.setState({
      checkout: checkoutCurrentState,
      alcApiRes: searchCurrentStateObj
    });
  };

  saveToFridge = () => {
    let checkout = { ...this.state.checkout };
    let alcApiRes = { ...this.state.alcApiRes };
    let fridge = { ...this.state.fridge };
    Object.keys(checkout).map(key => {
      checkout[key].in_checkout = false;
      checkout[key]["purchase_remaining"] =
        checkout[key]["purchase_quantity"] * checkout[key].total_package_units;
    });
    Object.keys(fridge).map(keys => {
      const fridgeId = fridge[keys].id;
      Object.keys(checkout).map(index => {
        if (fridgeId == index) {
          checkout[index].purchase_quantity += fridge[index].purchase_quantity;
          checkout[index].purchase_remaining +=
            fridge[index].purchase_remaining;
          // checkout[index].in_checkout = false;
        }
      });
    });
    fridge = checkout;
    checkout = {};
    alcApiRes = {};
    this.setState({
      fridge,
      checkout,
      alcApiRes
    });
  };

  drinkFridge = key => {
    const fridgeState = { ...this.state.fridge };
    let fridgeItem = fridgeState[key];
    fridgeItem.purchase_remaining = fridgeItem.purchase_remaining - 1;
    this.setState({
      fridge: fridgeState
    });
  };

  removeFromFridge = key => {
    const { params } = this.props.match;
    firebase
      .database()
      .ref(`${params.houseId}/fridge/${key}`)
      .remove();
  };

  pageChanger = instructions => {
    let currentPage = this.state.currentPage;
    if (instructions === "Next") {
      currentPage = currentPage + 1;
    } else {
      currentPage = currentPage - 1;
    }
    this.setState(
      {
        currentPage
      },
      () => this.apiChangePage()
    );
  };

  render() {
    return (
      <div>
        <h1>Beer Fridge</h1>
        {this.objectHasContent(this.state.fridge) ? (
          <BeerFridge
            fridge={this.state.fridge}
            drinkFridge={this.drinkFridge}
            removeFromFridge={this.removeFromFridge}
            saveCheckout={this.saveCheckout}
          />
        ) : null}
        <SimpleSearch
          getAlcName={this.getAlcName}
          alcSearchRes={this.alcSearchRes}
          alcApiRes={this.state.alcApiRes}
          alcSearchSuggestion={this.alcSearchSuggestion}
          clearSuggestion={this.clearSuggestion}
          currentPage={this.state.currentPage}
          alcSearchData={this.alcSearchData}
          apiSearch={this.apiSearch}
        />
        {this.state.alcApiRes.length ? (
          <DisplaySearchedAlc
            alcApiRes={this.state.alcApiRes}
            saveCheckout={this.saveCheckout}
            checkout={this.state.checkout}
            objectHasContent={this.objectHasContent}
            searchData={this.state.searchData}
            currentPage={this.state.currentPage}
            pageChanger={this.pageChanger}
            pageLoading={this.state.pageLoading}
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
