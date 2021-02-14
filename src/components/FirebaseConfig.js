import firebase from 'firebase/app'; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice. 
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// Initialize Firebase
let config = { //store in .env file later
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "brainstormy-a370a.firebaseapp.com",
    databaseURL: "https://brainstormy-a370a-default-rtdb.firebaseio.com",
    projectId: "brainstormy-a370a",
    storageBucket: "brainstormy-a370a.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
};
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, firebase, db, googleAuthProvider};