import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyALL4Iypql0OrVwJJn0IjOcG8rkRDq8FE8",
  authDomain: "yugo-97d77.firebaseapp.com",
  databaseURL: "https://yugo-97d77-default-rtdb.firebaseio.com",
  projectId: "yugo-97d77",
  storageBucket: "yugo-97d77.appspot.com",
  messagingSenderId: "669606420518",
  appId: "1:669606420518:web:233baf144a8dc2e06486e7",
  measurementId: "G-VT4RBH556M",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => fire.auth().signInWithPopup(provider);
const fbProvider = new firebase.auth.FacebookAuthProvider();
fbProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithFacebook = () => fire.auth().signInWithPopup(fbProvider);
export default fire;
