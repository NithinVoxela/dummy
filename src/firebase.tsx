// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-self-import
import firebase from "firebase/app";
import "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://fcm.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0_ie6XfEqSkfR01h9XbFrb0HefbrfPH0",
  authDomain: "cortexa-mvp.firebaseapp.com",
  projectId: "cortexa-mvp",
  storageBucket: "cortexa-mvp.appspot.com",
  messagingSenderId: "1028445054374",
  appId: "1:1028445054374:web:d56b2137778c6ed89c9b67",
  measurementId: "G-5BYHVF1VW7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound: (arg0: boolean) => void) => {
  return messaging
    .getToken({ vapidKey: "GENERATED_MESSAGING_KEY" })
    .then((currentToken: any) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log("No registration token available. Request permission to generate one.");
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err: any) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage((payload: unknown) => {
      resolve(payload);
    });
  });
