import * as firebase from "firebase";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBfUm-bnAgOPsB_6OFREnYh9h2h4VKvTkc",
  authDomain: "gqlreactnode-8a5d9.firebaseapp.com",
  projectId: "gqlreactnode-8a5d9",
  storageBucket: "gqlreactnode-8a5d9.appspot.com",
  //messagingSenderId: "893401349605",
  appId: "1:893401349605:web:6cb0532d33c32902cdc30c",
  measurementId: "G-VBS0G9MY0N",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();  
