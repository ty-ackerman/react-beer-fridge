import React from "react";
import axios from "axios";
import SimpleSearch from "./SimpleSearch";
import DisplaySearchedAlc from "./DisplaySearchedAlc";
import DisplaySuggestion from "./DisplaySuggestion";
import CheckoutMenu from "./CheckoutMenu";
import BeerFridge from "./BeerFridge";
import base, { firebaseApp } from "../base";
import MoreInfo from "./MoreInfo";
import Logout from "./Logout";
import firebase from "firebase";
import Login from "./Login";
import HouseChooser from "./HouseChooser";
import BackButton from "./BackButton";
import ChangeDisplay from "./ChangeDisplay";
// import ReactDOM from "react-dom";
// import GuestLogin from "./GuestLogin";

class App extends React.Component {
  state = {
    houseId: "",
    alcName: "",
    alcApiRes: {},
    suggestion: "",
    checkout: {},
    fridge: {},
    currentPage: 1,
    searchData: {},
    pageLoading: false,
    showMoreInfo: false,
    showMoreInfoId: "",
    uid: null,
    user: null,
    ownedByUser: [],
    guest: false,
    displayFridge: false,
    flagLoaded: false
  };

  componentDidUpdate() {
    localStorage.setItem(
      this.state.houseId,
      JSON.stringify(this.state.checkout)
    );
  }

  componentDidMount() {
    //Local Storage
    // const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(this.state.houseId);
    if (localStorageRef) {
      this.setState({
        checkout: JSON.parse(localStorageRef)
      });
    }

    //Firebase
    const houseId = this.state.houseId;
    () => {
      this.ref = base.syncState(`${houseId}/fridge/`, {
        context: this,
        state: "fridge"
      });
    };

    //Check to see if user is still logged in

    firebase.auth().onAuthStateChanged(user => {
      if (user.emailVerified) {
        this.authHandler({ user });
      }
    });
  }

  getHouseId = newId => {
    let houseId = this.state.houseId;
    houseId = newId;
    this.setState(
      {
        houseId
      },
      () => {
        // console.log(this.state.houseId);
        this.ref = base.syncState(`${houseId}/fridge/`, {
          context: this,
          state: "fridge"
        });
      }
    );
  };

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
          if (parseInt(checkoutKey, 0) === key.id) {
            key["in_checkout"] = true;
          }
          return null;
        });
        return null;
      });
    } else {
      currentSearch = {};
    }
    this.setState(
      {
        alcApiRes: currentSearch
      },
      () => {
        this.iterateThroughAlc();
      }
    );
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
    let currentPage = this.state.currentPage;
    let alcName = "";
    currentPage = 1;
    pageLoading = true;
    this.setState(
      {
        pageLoading,
        currentPage
      },
      () => {
        console.log(this.state.suggestion);
        if (!this.state.suggestion) {
          alcName = alcInput.value.value;
          console.log("here");
        } else {
          alcName = this.state.suggestion;
          console.log(this.state.suggestion);
        }
        console.log(alcName);
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
      }
    );
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
      if (fridge[index].id === parseInt(currentCheckout[id].id, 0)) {
        fridge[index].in_checkout = true;
      }
      return null;
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
      if (searchCurrentState[index].id === parseInt(key, 0)) {
        searchCurrentState[index]["in_checkout"] = false;
      }
      return null;
    });
    Object.keys(fridge).map(id => {
      if (fridge[id].id === parseInt(key, 0)) {
        fridge[id].in_checkout = false;
        // console.log(fridge[id].in_checkout);
      }
      return null;
    });
    this.setState({
      checkout: checkoutCurrentState,
      alcApiRes: searchCurrentStateObj,
      fridge
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
      return null;
    });
    Object.keys(fridge).map(keys => {
      const fridgeId = fridge[keys].id;
      Object.keys(checkout).map(index => {
        // console.log(typeof index);
        if (fridgeId === parseInt(index, 0)) {
          checkout[index].purchase_quantity += fridge[index].purchase_quantity;
          checkout[index].purchase_remaining +=
            fridge[index].purchase_remaining;
          // checkout[index].in_checkout = false;
        }
        return null;
      });
      return null;
    });
    fridge = checkout;
    checkout = {};
    alcApiRes = {};
    this.setState({
      checkout,
      fridge,
      alcApiRes,
      displayFridge: true
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
    firebase
      .database()
      .ref(`${this.state.houseId}/fridge/${key}`)
      .remove();

    const fridge = { ...this.state.fridge };
    fridge[key] = null;
    this.setState({
      fridge
    });
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

  changeShowMoreInfoState = id => {
    let showMoreInfo = this.state.showMoreInfo;
    let showMoreInfoId = this.state.showMoreInfoId;
    if (showMoreInfo) {
      showMoreInfo = false;
      showMoreInfoId = "";
    } else {
      showMoreInfo = true;
      showMoreInfoId = id;
    }
    this.setState({
      showMoreInfo,
      showMoreInfoId
    });
  };

  logMeOut = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
      user: null,
      ownedByUser: [],
      houseId: null,
      alcApiRes: {},
      searchData: {},
      showMoreInfo: false,
      currentPage: 1,
      suggestion: "",
      guest: false
      // checkout: {}
    });
  };

  authHandler = async authData => {
    if (authData) {
      console.log(authData);
      this.setState({
        uid: authData.user.uid,
        user: authData.user
      });
    }
  };

  authHandlerGuest = async authData => {
    if (authData) {
      console.log(authData);
      this.setState({
        uid: authData.uid,
        user: authData
      });
    }
  };

  authenticate = provider => {
    // console.log("worked");
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  findHousesOwned = () => {
    const dbRef = firebase.database().ref();
    let ownedByUser = this.state.ownedByUser;
    let pageLoading = true;
    this.setState({
      pageLoading
    });
    dbRef.on("value", data => {
      let house = data.val();
      if (house) {
        Object.keys(house).map(index => {
          if (house[index].owner === this.state.uid) {
            ownedByUser.push({
              [index]: house[index]
            });
          }
          return null;
        });
      }
      this.setState({
        ownedByUser,
        pageLoading: false
      });
    });
  };

  addOwnerToHouse = houseName => {
    //I need to add something here that checks to see if the house already exists
    console.log(this.state.uid);
    const dbRef = firebase.database().ref();
    dbRef.on("value", data => {
      let house = data.val();
      if (house) {
        Object.keys(house).map(index => {
          if (!house[index].owner) {
            base.post(`${houseName}/owner`, {
              data: this.state.uid
            });
          }
          return null;
        });
      }
    });
  };

  nameAllowed = testName => {
    const dbRef = firebase.database().ref();
    let allowed = true;
    dbRef.on("value", data => {
      let house = data.val();
      if (house) {
        Object.keys(house).map(index => {
          if (index === testName) {
            if (house[index].owner !== this.state.uid) {
              allowed = false;
            }
          }
          return null;
        });
      }
    });
    return allowed;
  };

  loginAsGuest = () => {
    console.log("clicked");
    let guest = this.state.guest;
    guest = true;
    this.setState({
      guest
    });
  };

  makeEmailUid = email => {
    let uid = this.state.uid;
    uid = email;
    this.setState({
      uid
    });
  };

  signInAnon = () => {
    firebaseApp
      .auth()
      .signInAnonymously()
      .then(this.authHandlerGuest);
  };

  backToHouseChooser = () => {
    // console.log("clicked");
    base.removeBinding(this.ref);
    this.setState({
      houseId: null,
      alcApiRes: {},
      searchData: {},
      showMoreInfo: false,
      currentPage: 1,
      suggestion: "",
      guest: false,
      ownedByUser: [],
      displayFridge: false
      // checkout: {}
    });
  };

  showFridge = () => {
    let displayFridge = this.state.displayFridge;
    displayFridge === true ? (displayFridge = false) : (displayFridge = true);
    this.setState({
      displayFridge
    });
  };

  showFridgeOnPageLoad = () => {
    console.log(this.state.fridge);
    let displayFridge = this.state.displayFridge;
    if (this.objectHasContent(this.state.fridge)) {
      displayFridge = true;
      this.setState({
        displayFridge
      });
      return true;
    } else {
      displayFridge = false;
      this.setState({
        displayFridge
      });
      return false;
    }
  };

  iterateThroughAlc() {
    //This function will take the user's query results, interate through them, and store the results in a new state to be displayed later on the page
    const resultsArray = [];
    const alcApiRes = [...this.state.alcApiRes];

    for (let item in alcApiRes) {
      //The function below takes the country of origin (alcApiRes[item].origin) as that argument, and returns the country of origin with ", " stripped

      let country = this.originStrip(alcApiRes[item].origin);

      alcApiRes[item]["origin"] = country;

      this.flagApiCall(country, alcApiRes[item]);

      //The function below will take the alcohol array and country of origin of the alcohol in question and make an API call to the flag API. It will then be added to the itemect of the alcohol
      resultsArray.push(alcApiRes[item]);
    }
    console.log(resultsArray);
    this.setState({
      alcApiRes: resultsArray,
      flagLoaded: true
    });
  }

  originStrip(origin) {
    //This function does exactly what it says, take the country of origin listed in the object, and returns just the country. no fluff added
    let country = "";
    for (let i in origin) {
      if (origin[i] != ",") {
        country += origin[i];
      } else {
        break;
      }
    }
    return country;
  }

  flagApiCall(country, alc) {
    axios({
      url: `https://restcountries.eu/rest/v2/name/${country}`
    }).then(res => {
      //This below will display all the data pretaining to country of the specific alcohol.
      //For now, all I am returning is the flag of the country in question
      let flag = res.data["0"].flag;
      alc["flag"] = flag;
    });
  }

  render() {
    if (!this.state.uid && !this.state.guest) {
      return (
        <Login
          authenticate={this.authenticate}
          loginAsGuest={this.loginAsGuest}
        />
      );
    }

    // else if (this.state.guest && !this.state.houseId) {
    //   return (
    //     <React.Fragment>
    //       <Logout logMeOut={this.logMeOut} />
    //       <GuestLogin
    //         nameAllowed={this.nameAllowed}
    //         addOwnerToHouse={this.addOwnerToHouse}
    //         getHouseId={this.getHouseId}
    //         makeEmailUid={this.makeEmailUid}
    //         uid={this.state.uid}
    //         signInAnon={this.signInAnon}
    //       />
    //     </React.Fragment>
    //   );
    // }
    else if (this.state.uid && !this.state.houseId) {
      return (
        <HouseChooser
          getHouseId={this.getHouseId}
          findHousesOwned={this.findHousesOwned}
          user={this.state.user}
          logMeOut={this.logMeOut}
          addOwnerToHouse={this.addOwnerToHouse}
          pageLoading={this.state.pageLoading}
          ownedByUser={this.state.ownedByUser}
          nameAllowed={this.nameAllowed}
        />
      );
    } else {
      return (
        <div className="container">
          <Logout logMeOut={this.logMeOut} />
          <BackButton
            backToHouseChooser={this.backToHouseChooser}
            showFridgeOnPageLoad={this.showFridgeOnPageLoad}
          />
          {this.objectHasContent(this.state.fridge) ? (
            <ChangeDisplay
              showFridge={this.showFridge}
              displayFridge={this.state.displayFridge}
            />
          ) : null}

          <h1 className="page-name">
            {typeof this.state.houseId === "array"
              ? this.state.houseId[0]
              : this.state.houseId}
          </h1>
          {this.state.showMoreInfo ? (
            <MoreInfo
              showMoreInfoId={this.state.showMoreInfoId}
              fridge={this.state.fridge}
            />
          ) : null}
          {this.objectHasContent(this.state.fridge) &&
          this.state.displayFridge ? (
            <BeerFridge
              fridge={this.state.fridge}
              drinkFridge={this.drinkFridge}
              removeFromFridge={this.removeFromFridge}
              saveCheckout={this.saveCheckout}
              showMoreInfo={this.state.showMoreInfo}
              changeShowMoreInfoState={this.changeShowMoreInfoState}
            />
          ) : (
            <React.Fragment>
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
              {this.state.alcApiRes.length && this.state.flagLoaded ? (
                <DisplaySearchedAlc
                  alcApiRes={this.state.alcApiRes}
                  saveCheckout={this.saveCheckout}
                  checkout={this.state.checkout}
                  objectHasContent={this.objectHasContent}
                  searchData={this.state.searchData}
                  currentPage={this.state.currentPage}
                  pageChanger={this.pageChanger}
                  pageLoading={this.state.pageLoading}
                  removeFromCheckout={this.removeFromCheckout}
                  flagLoaded={this.state.flagLoaded}
                />
              ) : this.state.suggestion.length ? (
                <DisplaySuggestion
                  suggestion={this.state.suggestion}
                  getAlcName={this.getAlcName}
                  alcSearchRes={this.alcSearchRes}
                  clearSuggestion={this.clearSuggestion}
                  apiSearch={this.apiSearch}
                />
              ) : null}
            </React.Fragment>
          )}
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
}

export default App;
