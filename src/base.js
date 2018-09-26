import Rebase from "re-base";
import firebase from "firebase";

//This is a template for when I want to start using firebase

const firebaseApp = firebase.initializeApp({
  //   apiKey: "AIzaSyCTQ-FHIamvXvkXqizFpBXR2EXCQAvr6I4",
  //   authDomain: "catch-of-the-day-ty.firebaseapp.com",
  //   databaseURL: "https://test.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a nemed export
export { firebaseApp };

export default base;
