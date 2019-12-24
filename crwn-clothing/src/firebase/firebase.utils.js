// Always need the base import
import firebase from 'firebase/app';
// Import firestore for the DB
import 'firebase/firestore';
// Import auth for the authentication
import 'firebase/auth';

// This is the object we copied from Firebase
const config = {
    apiKey: "AIzaSyA--jLyuullxBq7H8U2VujzwswILTes3wA",
    authDomain: "crwn-db-b90c5.firebaseapp.com",
    databaseURL: "https://crwn-db-b90c5.firebaseio.com",
    projectId: "crwn-db-b90c5",
    storageBucket: "crwn-db-b90c5.appspot.com",
    messagingSenderId: "645870761803",
    appId: "1:645870761803:web:daf925f13e5cd8b6e39ace",
    measurementId: "G-VPEMW2RJM6"
  };

firebase.initializeApp(config);

// Export this so we can call the auth whenever we want it
export const auth = firebase.auth();
// Export firestore so we can call it when needed
export const firestore = firebase.firestore();

// Google authentication utility (in the Firebase documentation)
const provider = new firebase.auth.GoogleAuthProvider();
// We trigger the sign in pop up window when we want to sign in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;