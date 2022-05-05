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

let messaging = null;
if (firebase.messaging.isSupported()) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
}

const publicKey = "BAQXUDweyA3-FEedhT1epSmC5Vha28mUSF9d_tqz5h5O_xrQGI90PcNMJQBok6hw6xwnEWo4FtnHxpHsf3hJC3U";

export const getToken = () => messaging
    ?.getToken({ vapidKey: publicKey })
    ?.then((currentToken) => {
      if (currentToken) {
        sessionStorage.setItem("messagingToken", currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging?.onMessage((payload) => {
      resolve(payload);
    });
  });
