import Rebase from "re-base";
import firebase from "firebase";

//This is a template for when I want to start using firebase

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDYs2__-lYzhn9TiohUudM1DVf8gGpUasI",
  authDomain: "beer-fridge-react.firebaseapp.com",
  databaseURL: "https://beer-fridge-react.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a nemed export
export { firebaseApp };

export default base;
