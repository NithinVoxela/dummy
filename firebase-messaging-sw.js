importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyA0_ie6XfEqSkfR01h9XbFrb0HefbrfPH0",
  authDomain: "cortexa-mvp.firebaseapp.com",
  projectId: "cortexa-mvp",
  storageBucket: "cortexa-mvp.appspot.com",
  messagingSenderId: "1028445054374",
  appId: "1:1028445054374:web:d56b2137778c6ed89c9b67",
  measurementId: "G-5BYHVF1VW7"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});