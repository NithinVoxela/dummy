importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// serviceworker.js
self.addEventListener('notificationclick', function(event) {
  // Close notification.
  event.notification.close();
  const url = event?.notification?.data?.FCM_MSG?.data?.url || "https://google.com";

  // Example: Open window after 3 seconds.
  // (doing so is a terrible user experience by the way, because
  //  the user is left wondering what happens for 3 seconds.)
  var promise = new Promise(function(resolve) {
      setTimeout(resolve, 3000);
  }).then(function() {
      // return the promise returned by openWindow, just in case.
      // Opening any origin only works in Chrome 43+.
      return clients.openWindow(url);
  });

  // Now wait for the promise to keep the permission alive.
  event.waitUntil(promise);
});

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

messaging?.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  let details = {};
  try {
    details = JSON.parse(payload?.notification?.body);
  } catch {
    details = {};
  }
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: details?.text,
    icon: './favicon.ico',
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions); 
});