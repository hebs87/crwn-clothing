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

// We create an asynchronous function to pull the userAuth
// object that is generated when a user logs in, and we then
// use it to store the relevant information in the DB
// We also want to pass in additionalData that we might use later
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // We only want to create a document if there is a userAuth,
    // so if the value isn't null. So if there is no userAuth,
    // we want to return out of the function
    if (!userAuth) return;

    // We store the userAuth's uid in a userRef const
    // We then get the userRef from the DB to see if it has
    // any data, and store the result of this async method
    // in a snapShot const
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // If the snapShot doesn't exist, we want to get the values,
    // set them and create a document in the collection
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

// We want to write a util that allows us to batch our
// data and move it to the database in one go, to avoid
// us having to manually add it to our database - this
// will be an asynchronous util.
// It takes the collectionKey and the objectsToAdd
export const addCollectionAndDocument = async (
    collectionKey,
    objectsToAdd
) => {
    // First, we want to create the collection in firebase
    // using the collectionKey of the collection in our app
    const collectionRef = firestore.collection(collectionKey);
    // We can only write one document to firestore at once, so
    // we want to use batch() to batch write the documents first,
    // and then add them all to firestore. This will ensure that
    // if one or more documents fail to upload, the whole process
    // will fail
    const batch = firestore.batch();
    // We loop over our objectsToAdd array using the forEach()
    // method - this difference between this and .map() is that
    // a new array isn't created, which is what we want
    objectsToAdd.forEach(obj => {
        // We are telling firebase to give us a new document
        // reference in this collection and randomly generate
        // an ID for it
        const newDocRef = collectionRef.doc();
        // We then call batch.set() so that we batch the requests
        // We pass it the newDocRef and the value we want to set
        // it to - obj in this instance
        batch.set(newDocRef, obj);
    });
    // We then want to commit our batch - this returns a promise
    // When commit() succeeds, it will return us a null value,
    // which is useful if we want to use .then to do something
    // after it succeeds, or if we want to handle errors too
    return await batch.commit();
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